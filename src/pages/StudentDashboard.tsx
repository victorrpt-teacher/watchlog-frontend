import { Anchor, Badge, Card, Group, Stack, Title } from '@mantine/core';
import { useParams, Navigate } from 'react-router-dom';
import { students } from '../config/students';
import { HealthIndicator } from '../components/HealthIndicator';
import { EndpointRunner } from '../components/EndpointRunner';

export function StudentDashboardPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const student = students.find((item) => item.id === studentId);

  if (!student) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack gap="xl">
      <Stack gap={4}>
        <Title order={2}>{student.name}</Title>
        <Anchor href={student.baseUrl} target="_blank" rel="noopener noreferrer">
          {student.baseUrl}
        </Anchor>
        <HealthIndicator baseUrl={student.baseUrl} healthPath={student.healthPath} />
      </Stack>

      <Card withBorder radius="md" shadow="sm">
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={3}>Endpoints disponibles</Title>
            <Badge variant="light">{student.endpoints.length} rutas</Badge>
          </Group>

          <Stack gap="sm">
            {student.endpoints.map((endpoint) => (
              <EndpointRunner
                key={`${endpoint.method}-${endpoint.path}`}
                baseUrl={student.baseUrl}
                endpoint={endpoint}
              />
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
