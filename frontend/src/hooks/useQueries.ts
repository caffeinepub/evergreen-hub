import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob, SiteContent, ContactInterest, WithdrawalRequestStatus } from '../backend';
import { Principal } from '@dfinity/principal';

// PaymentStatus is not directly exported from backend as a type we can import,
// so we define the union here matching the backend enum values.
type PaymentStatusFilter = 'pending' | 'approved' | 'rejected';

// ─── Profile Photo ───────────────────────────────────────────────────────────

export function useUploadProfilePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!actor) throw new Error('Actor not available');
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      return actor.uploadProfilePhoto(blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Landing Pages ────────────────────────────────────────────────────────────

export function useGetLandingPageById(pageId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['landingPage', pageId?.toString()],
    queryFn: async () => {
      if (!actor || pageId === null) return null;
      return actor.getLandingPageById(pageId);
    },
    enabled: !!actor && !isFetching && pageId !== null,
  });
}

export function useIncrementLandingPageVisit() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (pageId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.incrementLandingPageVisit(pageId);
    },
  });
}

export function useGetLandingPages(userId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['landingPages', userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getLandingPages(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useCreateLandingPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, content, template }: { title: string; content: string; template: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLandingPage(title, content, template);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingPages'] });
    },
  });
}

export function useUpdateLandingPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, title, content }: { pageId: bigint; title: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLandingPage(pageId, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingPages'] });
    },
  });
}

export function useDeleteLandingPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pageId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteLandingPage(pageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingPages'] });
    },
  });
}

// ─── Packages ─────────────────────────────────────────────────────────────────

export function useGetAllPackages() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allPackages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetActivePackages() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['activePackages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivePackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, price, courses }: { name: string; price: bigint; courses: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createPackage(name, price, courses);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPackages'] });
      queryClient.invalidateQueries({ queryKey: ['activePackages'] });
    },
  });
}

export function useUpdatePackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ packageId, name, price, courses }: { packageId: bigint; name: string; price: bigint; courses: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updatePackage(packageId, name, price, courses);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPackages'] });
      queryClient.invalidateQueries({ queryKey: ['activePackages'] });
    },
  });
}

export function useDeletePackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePackage(packageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPackages'] });
      queryClient.invalidateQueries({ queryKey: ['activePackages'] });
    },
  });
}

export function useTogglePackageStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.togglePackageStatus(packageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPackages'] });
      queryClient.invalidateQueries({ queryKey: ['activePackages'] });
    },
  });
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

export function useGetAdminStats() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAdminStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

// ─── Users ────────────────────────────────────────────────────────────────────

export function useGetAllUsers() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserProfile(userId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getUserProfile(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useToggleUserBlock() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.toggleUserBlock(Principal.fromText(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });
}

export function useDeleteUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteUser(Principal.fromText(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });
}

// ─── Payment Proofs ───────────────────────────────────────────────────────────

export function useGetAllPaymentProofs() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allPaymentProofs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPaymentProofs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPaymentProofsByStatus(status: PaymentStatusFilter | 'all') {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['paymentProofs', status],
    queryFn: async () => {
      if (!actor) return [];
      if (status === 'all') return actor.getAllPaymentProofs();
      return actor.getPaymentProofsByStatus(status as any);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApprovePaymentProof() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (proofId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approvePaymentProof(proofId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentProofs'] });
      queryClient.invalidateQueries({ queryKey: ['allPaymentProofs'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
  });
}

export function useRejectPaymentProof() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (proofId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectPaymentProof(proofId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentProofs'] });
      queryClient.invalidateQueries({ queryKey: ['allPaymentProofs'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
  });
}

// ─── My Payments (User) ───────────────────────────────────────────────────────

export function useGetMyPaymentProofs() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['myPaymentProofs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPaymentProofs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitPaymentProof() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      packageId,
      transactionId,
      screenshotFile,
      onProgress,
    }: {
      packageId: bigint;
      transactionId: string;
      screenshotFile: File;
      onProgress?: (pct: number) => void;
    }) => {
      if (!actor) throw new Error('Actor not available');
      const arrayBuffer = await screenshotFile.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) blob = blob.withUploadProgress(onProgress);
      return actor.submitPaymentProof(packageId, transactionId, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPaymentProofs'] });
    },
  });
}

// ─── Withdrawal Requests ──────────────────────────────────────────────────────

export function useGetAllWithdrawalRequests() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allWithdrawalRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWithdrawalRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, status }: { requestId: bigint; status: WithdrawalRequestStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateRequestStatus(requestId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allWithdrawalRequests'] });
    },
  });
}

export function useGetWithdrawalRequests(userId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['withdrawalRequests', userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getWithdrawalRequests(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useCreateWithdrawalRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount, message }: { amount: bigint; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createWithdrawalRequest(amount, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdrawalRequests'] });
    },
  });
}

// ─── Earnings ─────────────────────────────────────────────────────────────────

export function useGetEarnings(userId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['earnings', userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getEarnings(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ─── Referrals ────────────────────────────────────────────────────────────────

export function useGetReferralsByUser(userId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['referrals', userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getReferralsByUser(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetTotalCommissions(userId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['totalCommissions', userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getTotalCommissions(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ─── Contact Interests ────────────────────────────────────────────────────────

export function useGetAllContactInterests() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactInterest[]>({
    queryKey: ['allContactInterests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactInterests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarkContactResolved() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.markContactResolved(contactId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allContactInterests'] });
    },
  });
}

export function useSubmitContactInterest() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      phone,
      email,
      message,
    }: {
      name: string;
      phone: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactInterest(name, phone, email, message);
    },
  });
}

// ─── Site Content ─────────────────────────────────────────────────────────────

export function useGetPersistentSiteContent() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['persistentSiteContent'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPersistentSiteContent();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000,
  });
}

export function useSetPersistentSiteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: SiteContent) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setPersistentSiteContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persistentSiteContent'] });
    },
  });
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, phone }: { name: string; phone: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProfile(name, phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
