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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Check, X, Eye } from 'lucide-react';
import ImageModal from '../../components/admin/ImageModal';
import type { PaymentProof, PaymentStatus } from '../../backend';

export default function PaymentManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<'all' | PaymentStatus>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: paymentProofs = [], isLoading } = useQuery({
    queryKey: ['allPaymentProofs', statusFilter],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      if (statusFilter === 'all') {
        return actor.getAllPaymentProofs();
      }
      return actor.getPaymentProofsByStatus(statusFilter);
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
      toast.success('Payment proof approved');
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

  const getPackageName = (packageId: bigint) => {
    const pkg = packages.find((p) => p.id === packageId);
    return pkg?.name || 'Unknown Package';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewScreenshot = async (proof: PaymentProof) => {
    try {
      const imageUrl = proof.screenshotBlob.getDirectURL();
      setSelectedImage(imageUrl);
    } catch (error) {
      toast.error('Failed to load screenshot');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading payment proofs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground mt-1">Review and manage payment proof submissions</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as 'all' | PaymentStatus)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
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
            {paymentProofs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No payment proofs found
                </TableCell>
              </TableRow>
            ) : (
              paymentProofs.map((proof) => (
                <TableRow key={proof.id.toString()}>
                  <TableCell className="font-medium">
                    {getUserName(proof.userId.toString())}
                  </TableCell>
                  <TableCell>{getPackageName(proof.packageId)}</TableCell>
                  <TableCell className="font-mono text-sm">{proof.transactionId}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewScreenshot(proof)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                  <TableCell>{getStatusBadge(proof.status)}</TableCell>
                  <TableCell>
                    {new Date(Number(proof.createdAt) / 1000000).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {proof.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => approveMutation.mutate(proof.id)}
                            disabled={approveMutation.isPending}
                            title="Approve"
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => rejectMutation.mutate(proof.id)}
                            disabled={rejectMutation.isPending}
                            title="Reject"
                          >
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
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
