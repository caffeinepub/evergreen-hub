import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { useAuth } from '../../contexts/AuthContext';
import { useGetEarnings } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { DollarSign, Send } from 'lucide-react';
import type { WithdrawalRequest } from '../../backend';

export default function WithdrawalRequests() {
  const { actor } = useActor();
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const { data: requests = [], isLoading } = useQuery<WithdrawalRequest[]>({
    queryKey: ['withdrawalRequests', userProfile?.principal.toString()],
    queryFn: async () => {
      if (!actor || !userProfile) throw new Error('Actor or user profile not available');
      return actor.getWithdrawalRequests(userProfile.principal);
    },
    enabled: !!actor && !!userProfile,
  });

  // Fetch user's earnings
  const { data: earnings } = useGetEarnings(userProfile?.principal.toString() || '');

  const createRequestMutation = useMutation({
    mutationFn: async ({ amount, message }: { amount: number; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createWithdrawalRequest(BigInt(amount), message);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['withdrawalRequests'] });
      
      // Construct WhatsApp message
      const userName = userProfile?.name || 'User';
      const lifetimeEarnings = earnings?.lifetime ? Number(earnings.lifetime) : 0;
      const withdrawalAmount = variables.amount;
      const userMessage = variables.message;
      
      const whatsappMessage = `Withdrawal Request from ${userName}: Earned ₹${lifetimeEarnings}, Requesting ₹${withdrawalAmount}. Message: ${userMessage}`;
      const whatsappUrl = `https://wa.me/919263989760?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      toast.success('Withdrawal request submitted! Admin will be notified via WhatsApp.');
      setAmount('');
      setMessage('');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit withdrawal request');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (!userProfile) {
      toast.error('User profile not loaded. Please try again.');
      return;
    }

    if (!earnings) {
      toast.error('Earnings data not loaded. Please wait and try again.');
      return;
    }

    createRequestMutation.mutate({ amount: amountNum, message: message.trim() });
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading withdrawal requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Withdrawal Requests</h1>
        <p className="text-muted-foreground mt-1">Request withdrawals and track their status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            New Withdrawal Request
          </CardTitle>
          <CardDescription>Submit a request to withdraw your earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹) *</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to withdraw"
                required
                disabled={createRequestMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your payment details or any additional information..."
                rows={4}
                required
                disabled={createRequestMutation.isPending}
              />
              <p className="text-xs text-muted-foreground">
                Include your payment method details (UPI ID, bank account, etc.)
              </p>
            </div>

            <Button
              type="submit"
              disabled={createRequestMutation.isPending || !earnings}
              className="w-full"
            >
              {createRequestMutation.isPending ? (
                <>
                  <Send className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Withdrawal Requests</CardTitle>
          <CardDescription>View the status of your withdrawal requests</CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No withdrawal requests yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amount</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id.toString()}>
                      <TableCell className="font-medium">₹{Number(request.amount)}</TableCell>
                      <TableCell className="max-w-xs truncate">{request.message}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        {new Date(Number(request.createdAt) / 1000000).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
