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
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Check, X, Eye, CreditCard } from 'lucide-react';
import ImageModal from '../../components/admin/ImageModal';
import type { PaymentProof } from '../../backend';

type PaymentStatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

const FILTER_OPTIONS: { label: string; value: PaymentStatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

export default function PaymentManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: allPaymentProofs = [], isLoading } = useQuery({
    queryKey: ['allPaymentProofs'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllPaymentProofs();
    },
    enabled: !!actor,
  });

  const { data: users = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllUsers();
    },
    enabled: !!actor,
  });

  const { data: packages = [] } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllPackages();
    },
    enabled: !!actor,
  });

  const approveMutation = useMutation({
    mutationFn: async (proofId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approvePaymentProof(proofId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPaymentProofs'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      toast.success('Payment proof approved successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to approve payment proof');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (proofId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectPaymentProof(proofId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPaymentProofs'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      toast.success('Payment proof rejected');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to reject payment proof');
    },
  });

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.principal.toString() === userId);
    return user?.name || 'Unknown User';
  };

  const getUserPhone = (userId: string) => {
    const user = users.find((u) => u.principal.toString() === userId);
    return user?.phone || '';
  };

  const getPackageName = (packageId: bigint) => {
    const pkg = packages.find((p) => p.id === packageId);
    return pkg?.name || 'Unknown Package';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Approved</Badge>;
      case 'pending':
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600 dark:text-yellow-400">
            Pending
          </Badge>
        );
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewScreenshot = (proof: PaymentProof) => {
    try {
      const imageUrl = proof.screenshotBlob.getDirectURL();
      setSelectedImage(imageUrl);
    } catch {
      toast.error('Failed to load screenshot');
    }
  };

  // Filter proofs client-side based on selected status
  const filteredProofs =
    statusFilter === 'all'
      ? allPaymentProofs
      : allPaymentProofs.filter((p) => p.status === statusFilter);

  // Count per status for badge display
  const counts = {
    all: allPaymentProofs.length,
    pending: allPaymentProofs.filter((p) => p.status === 'pending').length,
    approved: allPaymentProofs.filter((p) => p.status === 'approved').length,
    rejected: allPaymentProofs.filter((p) => p.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground mt-0.5">
            Review and manage payment proof submissions
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTER_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={statusFilter === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(option.value)}
            className="gap-2"
          >
            {option.label}
            <span
              className={`inline-flex items-center justify-center rounded-full text-xs font-medium min-w-[1.25rem] h-5 px-1 ${
                statusFilter === option.value
                  ? 'bg-white/20 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {counts[option.value]}
            </span>
          </Button>
        ))}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Screenshot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredProofs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>No {statusFilter !== 'all' ? statusFilter : ''} payment proofs found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredProofs.map((proof) => (
                <TableRow key={proof.id.toString()}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{getUserName(proof.userId.toString())}</p>
                      <p className="text-xs text-muted-foreground">{getUserPhone(proof.userId.toString())}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {getPackageName(proof.packageId)}
                  </TableCell>
                  <TableCell className="font-mono text-xs max-w-[120px] truncate" title={proof.transactionId}>
                    {proof.transactionId}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewScreenshot(proof)}
                      className="gap-1.5 text-xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                  </TableCell>
                  <TableCell>{getStatusBadge(proof.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(Number(proof.createdAt) / 1_000_000).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {proof.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => approveMutation.mutate(proof.id)}
                          disabled={approveMutation.isPending || rejectMutation.isPending}
                          title="Approve"
                          className="h-8 w-8 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                        >
                          <Check className="h-4 w-4 text-emerald-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => rejectMutation.mutate(proof.id)}
                          disabled={approveMutation.isPending || rejectMutation.isPending}
                          title="Reject"
                          className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">Processed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}
