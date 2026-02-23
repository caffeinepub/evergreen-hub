import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import type { Package } from '../../backend';

interface PackageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  package: Package | null;
}

export default function PackageModal({ open, onOpenChange, package: pkg }: PackageModalProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    courses: '',
  });

  useEffect(() => {
    if (pkg) {
      setFormData({
        name: pkg.name,
        price: Number(pkg.price).toString(),
        courses: pkg.courses,
      });
    } else {
      setFormData({
        name: '',
        price: '',
        courses: '',
      });
    }
  }, [pkg, open]);

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.createPackage(
        formData.name,
        BigInt(formData.price),
        formData.courses
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      toast.success('Package created successfully');
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create package');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !pkg) throw new Error('Actor or package not available');
      return actor.updatePackage(
        pkg.id,
        formData.name,
        BigInt(formData.price),
        formData.courses
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      toast.success('Package updated successfully');
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update package');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.courses.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (pkg) {
      updateMutation.mutate();
    } else {
      createMutation.mutate();
    }
  };

  const loading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{pkg ? 'Edit Package' : 'Add New Package'}</DialogTitle>
          <DialogDescription>
            {pkg ? 'Update package details' : 'Create a new course package'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Package Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="E-LITE Package"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="699"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courses">Courses (comma-separated)</Label>
            <Textarea
              id="courses"
              value={formData.courses}
              onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
              placeholder="Course 1, Course 2, Course 3"
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : pkg ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
