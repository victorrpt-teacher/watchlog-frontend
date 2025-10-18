import axios from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

export type HealthStatus = 'online' | 'offline' | 'unknown';

export interface HealthResponse {
  status?: string;
  [key: string]: unknown;
}

export interface UseHealthStatusOptions {
  baseUrl: string;
  healthPath?: string;
  refetchIntervalMs?: number;
}

export interface HealthStatusResult {
  status: HealthStatus;
  data: HealthResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  query: UseQueryResult<HealthResponse, unknown>;
}

const isHealthOk = (data: HealthResponse | undefined) => {
  if (!data) return false;
  const value = typeof data.status === 'string' ? data.status.toLowerCase() : '';
  return value === 'ok' || value === 'healthy' || value === 'up';
};

export function useHealthStatus({
  baseUrl,
  healthPath = '/health/',
  refetchIntervalMs = 60_000,
}: UseHealthStatusOptions): HealthStatusResult {
  const url = new URL(healthPath, baseUrl).toString();

  const query = useQuery<HealthResponse>({
    queryKey: ['health', url],
    queryFn: async () => {
      const response = await axios.get<HealthResponse>(url, {
        headers: { 'Cache-Control': 'no-cache' },
      });
      return response.data;
    },
    refetchInterval: refetchIntervalMs,
    placeholderData: keepPreviousData,
    retry: 1,
    staleTime: 30_000,
  });

  let status: HealthStatus = 'unknown';
  if (query.isSuccess) {
    status = isHealthOk(query.data) ? 'online' : 'offline';
  } else if (query.isError) {
    status = 'offline';
  }

  return {
    status,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    query,
  };
}
