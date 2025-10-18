import { Badge, Group, Loader, Text } from '@mantine/core';
import { useHealthStatus } from '../hooks/useHealthStatus';
import type { HealthStatus } from '../hooks/useHealthStatus';

export interface HealthIndicatorProps {
  baseUrl: string;
  healthPath?: string;
  refetchIntervalMs?: number;
}

export function HealthIndicator({
  baseUrl,
  healthPath,
  refetchIntervalMs,
}: HealthIndicatorProps) {
  const { status, isLoading } = useHealthStatus({
    baseUrl,
    healthPath,
    refetchIntervalMs,
  });

  const colorMap: Record<HealthStatus, string> = {
    online: 'green',
    offline: 'red',
    unknown: 'gray',
  };

  const labelMap: Record<HealthStatus, string> = {
    online: 'En línea',
    offline: 'Fuera de servicio',
    unknown: 'Sin datos',
  };

  return (
    <Group gap="xs">
      <Badge
        color={colorMap[status]}
        leftSection={
          isLoading ? (
            <Loader size="xs" color="white" />
          ) : (
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: `var(--mantine-color-${colorMap[status]}-5)`,
              }}
            />
          )
        }
      >
        {labelMap[status]}
      </Badge>
      <Text size="sm" c="dimmed">
        {healthPath ?? '/health/'}
      </Text>
    </Group>
  );
}
