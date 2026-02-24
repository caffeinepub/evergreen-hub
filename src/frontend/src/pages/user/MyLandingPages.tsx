import { useAuth } from '../../contexts/AuthContext';
import { useGetLandingPages, useDeleteLandingPage } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Trash2, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useNavigate } from '@tanstack/react-router';

export default function MyLandingPages() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const { data: landingPages, isLoading } = useGetLandingPages(userProfile?.principal.toString() || '');
  const deleteLandingPage = useDeleteLandingPage();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState<bigint | null>(null);

  const handlePreview = (pageId: bigint) => {
    window.open(`/landing/${pageId}`, '_blank');
  };

  const handleEdit = (pageId: bigint) => {
    navigate({ to: '/dashboard/landing-page-builder', search: { edit: pageId.toString() } });
  };

  const handleDeleteClick = (pageId: bigint) => {
    setSelectedPageId(pageId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPageId) return;

    try {
      await deleteLandingPage.mutateAsync(selectedPageId);
      toast.success('Landing page deleted successfully!');
      setDeleteDialogOpen(false);
      setSelectedPageId(null);
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete landing page');
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Landing Pages</h1>
          <p className="text-muted-foreground mt-1">Loading your landing pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Landing Pages</h1>
          <p className="text-muted-foreground mt-1">View and manage all your created landing pages</p>
        </div>
        <Button
          onClick={() => navigate({ to: '/dashboard/landing-page-builder' })}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Create New Page
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-yellow-500">Your Landing Pages</CardTitle>
          <CardDescription>
            {landingPages?.length || 0} landing page{landingPages?.length !== 1 ? 's' : ''} created
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!landingPages || landingPages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't created any landing pages yet.</p>
              <Button
                onClick={() => navigate({ to: '/dashboard/landing-page-builder' })}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Create Your First Landing Page
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Created
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Visits
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {landingPages.map((page) => (
                    <TableRow key={page.id.toString()}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {page.template}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(page.createdAt)}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                          <Eye className="h-4 w-4" />
                          {page.visitCount.toString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePreview(page.id)}
                            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(page.id)}
                            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClick(page.id)}
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your landing page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
