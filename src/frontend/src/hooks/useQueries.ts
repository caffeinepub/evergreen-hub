import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Package, PaymentProof, UserProfile, AdminStats, Earnings, WithdrawalRequest, LandingPage, Referral } from '../backend';
import { Principal } from '@dfinity/principal';
import { ExternalBlob } from '../backend';

export function useGetActivePackages() {
  const { actor, isFetching } = useActor();

  return useQuery<Package[]>({
    queryKey: ['activePackages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivePackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMyPaymentProofs() {
  const { actor, isFetching } = useActor();

  return useQuery<PaymentProof[]>({
    queryKey: ['myPaymentProofs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPaymentProofs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
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

export function useGetAdminStats() {
  const { actor, isFetching } = useActor();

  return useQuery<AdminStats>({
    queryKey: ['adminStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAdminStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useGetAllPackages() {
  const { actor, isFetching } = useActor();

  return useQuery<Package[]>({
    queryKey: ['allPackages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPaymentProofs() {
  const { actor, isFetching } = useActor();

  return useQuery<PaymentProof[]>({
    queryKey: ['allPaymentProofs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPaymentProofs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEarnings(userId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Earnings>({
    queryKey: ['earnings', userId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const principal = Principal.fromText(userId);
      return actor.getEarnings(principal);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetWithdrawalRequests(userId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<WithdrawalRequest[]>({
    queryKey: ['withdrawalRequests', userId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const principal = Principal.fromText(userId);
      return actor.getWithdrawalRequests(principal);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetAllWithdrawalRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<WithdrawalRequest[]>({
    queryKey: ['allWithdrawalRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWithdrawalRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLandingPages(userId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<LandingPage[]>({
    queryKey: ['landingPages', userId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const principal = Principal.fromText(userId);
      return actor.getLandingPages(principal);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetLandingPageById(pageId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<LandingPage | null>({
    queryKey: ['landingPage', pageId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLandingPageById(BigInt(pageId));
    },
    enabled: !!actor && !isFetching && !!pageId,
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

export function useChangePassword() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
      if (!actor) throw new Error('Actor not available');
      // @ts-ignore - Backend function will be added
      return actor.changePassword(currentPassword, newPassword);
    },
  });
}

export function useUploadProfilePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!actor) throw new Error('Actor not available');
      
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array);
      
      return actor.uploadProfilePhoto(blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
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

// Referral hooks
export function useGetReferralsByUser(userId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Referral[]>({
    queryKey: ['referrals', userId],
    queryFn: async () => {
      if (!actor) return [];
      const principal = Principal.fromText(userId);
      return actor.getReferralsByUser(principal);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetTotalCommissions(userId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<{ totalActive: bigint; totalPassive: bigint; pending: bigint }>({
    queryKey: ['commissions', userId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const principal = Principal.fromText(userId);
      return actor.getTotalCommissions(principal);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetUserProfile(userId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      if (!actor) return null;
      const principal = Principal.fromText(userId);
      return actor.getUserProfile(principal);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}
