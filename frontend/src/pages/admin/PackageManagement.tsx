import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import PackageModal from '../../components/admin/PackageModal';
import type { Package as PackageType } from '../../backend';

export default function PackageManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null);
  const [deletePackageId, setDeletePackageId] = useState<bigint | null>(null);

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllPackages();
    },
    enabled: !!actor,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (packageId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.togglePackageStatus(packageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      queryClient.invalidateQueries({ queryKey: ['allPackages'] });
      queryClient.invalidateQueries({ queryKey: ['activePackages'] });
      toast.success('Package status updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update package status');
    },
  });

  const deletePackageMutation = useMutation({
    mutationFn: async (packageId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePackage(packageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      queryClient.invalidateQueries({ queryKey: ['allPackages'] });
      queryClient.invalidateQueries({ queryKey: ['activePackages'] });
      toast.success('Package deleted successfully');
      setDeletePackageId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete package');
    },
  });

  const handleEdit = (pkg: PackageType) => {
    setEditingPackage(pkg);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPackage(null);
    setModalOpen(true);
  };

  const activeCount = packages.filter((p) => p.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Package Management</h1>
            <p className="text-muted-foreground mt-0.5">
              {packages.length} packages — {activeCount} active
            </p>
          </div>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Package
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : packages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  <Package className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>No packages found. Add your first package.</p>
                </TableCell>
              </TableRow>
            ) : (
              packages.map((pkg) => (
                <TableRow key={pkg.id.toString()}>
                  <TableCell className="font-semibold">{pkg.name}</TableCell>
                  <TableCell className="font-medium">
                    ₹{Number(pkg.price).toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm text-muted-foreground" title={pkg.courses}>
                      {pkg.courses}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={pkg.status === 'active' ? 'default' : 'secondary'}
                      className={
                        pkg.status === 'active'
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          : ''
                      }
                    >
                      {pkg.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Switch
                        checked={pkg.status === 'active'}
                        onCheckedChange={() => toggleStatusMutation.mutate(pkg.id)}
                        disabled={toggleStatusMutation.isPending}
                        title={pkg.status === 'active' ? 'Deactivate' : 'Activate'}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(pkg)}
                        className="h-8 w-8"
                        title="Edit package"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletePackageId(pkg.id)}
                        disabled={deletePackageMutation.isPending}
                        className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-950/30"
                        title="Delete package"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PackageModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        package={editingPackage}
      />

      <AlertDialog open={!!deletePackageId} onOpenChange={() => setDeletePackageId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Package?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the package and may affect
              users who have purchased it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePackageId && deletePackageMutation.mutate(deletePackageId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deletePackageMutation.isPending}
            >
              {deletePackageMutation.isPending ? 'Deleting...' : 'Delete Package'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
