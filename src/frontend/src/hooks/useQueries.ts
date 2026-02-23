import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Package, PaymentProof, UserProfile, AdminStats } from '../backend';

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
