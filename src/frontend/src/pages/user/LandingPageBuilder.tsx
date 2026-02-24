import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { useAuth } from '../../contexts/AuthContext';
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
  const { actor } = useActor();
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingPage, setEditingPage] = useState<LandingPage | null>(null);
  const [deletePageId, setDeletePageId] = useState<bigint | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [template, setTemplate] = useState('basic');

  const { data: pages = [], isLoading } = useQuery<LandingPage[]>({
    queryKey: ['landingPages', userProfile?.principal.toString()],
    queryFn: async () => {
      if (!actor || !userProfile) throw new Error('Actor or user profile not available');
      return actor.getLandingPages(userProfile.principal);
    },
    enabled: !!actor && !!userProfile,
  });

  const createPageMutation = useMutation({
    mutationFn: async ({ title, content, template }: { title: string; content: string; template: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLandingPage(title, content, template);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingPages'] });
      toast.success('Landing page created successfully!');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create landing page');
    },
  });

  const updatePageMutation = useMutation({
    mutationFn: async ({ pageId, title, content }: { pageId: bigint; title: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLandingPage(pageId, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingPages'] });
      toast.success('Landing page updated successfully!');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update landing page');
    },
  });

  const deletePageMutation = useMutation({
    mutationFn: async (pageId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteLandingPage(pageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingPages'] });
      toast.success('Landing page deleted successfully!');
      setDeletePageId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete landing page');
    },
  });

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
      updatePageMutation.mutate({ pageId: editingPage.id, title: title.trim(), content: content.trim() });
    } else {
      createPageMutation.mutate({ title: title.trim(), content: content.trim(), template });
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
      deletePageMutation.mutate(deletePageId);
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
                  <Select value={template} onValueChange={setTemplate}>
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
                  placeholder="Enter your page content (HTML supported)..."
                  rows={10}
                  required
                  disabled={createPageMutation.isPending || updatePageMutation.isPending}
                />
                <p className="text-xs text-muted-foreground">
                  You can use HTML tags to format your content
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createPageMutation.isPending || updatePageMutation.isPending}
                >
                  {createPageMutation.isPending || updatePageMutation.isPending ? (
                    'Saving...'
                  ) : editingPage ? (
                    'Update Page'
                  ) : (
                    'Create Page'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
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
          <CardDescription>Manage your created landing pages</CardDescription>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No landing pages yet. Create your first one!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id.toString()}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell className="capitalize">{page.template}</TableCell>
                      <TableCell>
                        {new Date(Number(page.createdAt) / 1000000).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(Number(page.updatedAt) / 1000000).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(page)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(page.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
