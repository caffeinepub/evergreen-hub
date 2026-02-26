import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGetLandingPages, useCreateLandingPage, useUpdateLandingPage, useDeleteLandingPage } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { FileText, Plus, Edit, Trash2, Eye } from 'lucide-react';
import type { LandingPage } from '../../backend';

export default function LandingPageBuilder() {
  const { userProfile } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [editingPage, setEditingPage] = useState<LandingPage | null>(null);
  const [deletePageId, setDeletePageId] = useState<bigint | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [template, setTemplate] = useState('basic');

  const { data: pages = [], isLoading } = useGetLandingPages(userProfile?.principal.toString() || '');
  const createPageMutation = useCreateLandingPage();
  const updatePageMutation = useUpdateLandingPage();
  const deletePageMutation = useDeleteLandingPage();

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTemplate('basic');
    setIsCreating(false);
    setEditingPage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingPage) {
      updatePageMutation.mutate(
        { pageId: editingPage.id, title: title.trim(), content: content.trim() },
        {
          onSuccess: () => {
            toast.success('Landing page updated successfully!');
            resetForm();
          },
          onError: (error: any) => {
            toast.error(error.message || 'Failed to update landing page');
          },
        }
      );
    } else {
      createPageMutation.mutate(
        { title: title.trim(), content: content.trim(), template },
        {
          onSuccess: () => {
            toast.success('Landing page created successfully!');
            resetForm();
          },
          onError: (error: any) => {
            toast.error(error.message || 'Failed to create landing page');
          },
        }
      );
    }
  };

  const handleEdit = (page: LandingPage) => {
    setEditingPage(page);
    setTitle(page.title);
    setContent(page.content);
    setTemplate(page.template);
    setIsCreating(true);
  };

  const handleDelete = (pageId: bigint) => {
    setDeletePageId(pageId);
  };

  const confirmDelete = () => {
    if (deletePageId) {
      deletePageMutation.mutate(deletePageId, {
        onSuccess: () => {
          toast.success('Landing page deleted successfully!');
          setDeletePageId(null);
        },
        onError: (error: any) => {
          toast.error(error.message || 'Failed to delete landing page');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading landing pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Landing Page Builder</h1>
          <p className="text-muted-foreground mt-1">Create and manage your custom landing pages</p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Page
          </Button>
        )}
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-500" />
              {editingPage ? 'Edit Landing Page' : 'Create New Landing Page'}
            </CardTitle>
            <CardDescription>
              {editingPage ? 'Update your landing page details' : 'Design a custom landing page for your campaigns'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter page title"
                  required
                  disabled={createPageMutation.isPending || updatePageMutation.isPending}
                />
              </div>

              {!editingPage && (
                <div className="space-y-2">
                  <Label htmlFor="template">Template</Label>
                  <Select value={template} onValueChange={setTemplate} disabled={createPageMutation.isPending}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="content">Page Content *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your page content here..."
                  rows={8}
                  required
                  disabled={createPageMutation.isPending || updatePageMutation.isPending}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={createPageMutation.isPending || updatePageMutation.isPending}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  {createPageMutation.isPending || updatePageMutation.isPending ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                      {editingPage ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>{editingPage ? 'Update Page' : 'Create Page'}</>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={createPageMutation.isPending || updatePageMutation.isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Landing Pages</CardTitle>
          <CardDescription>Manage all your created landing pages</CardDescription>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No landing pages created yet</p>
              <Button onClick={() => setIsCreating(true)} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Page
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Total Visits</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id.toString()}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {page.template}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Eye className="h-4 w-4 text-emerald-500" />
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {Number(page.visitCount).toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(Number(page.createdAt) / 1000000).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(Number(page.updatedAt) / 1000000).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(page)}
                            disabled={createPageMutation.isPending || updatePageMutation.isPending || deletePageMutation.isPending}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(page.id)}
                            disabled={createPageMutation.isPending || updatePageMutation.isPending || deletePageMutation.isPending}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deletePageId !== null} onOpenChange={() => setDeletePageId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your landing page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePageMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deletePageMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletePageMutation.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
