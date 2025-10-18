import {
  Badge,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { students } from '../config/students';
import { HealthIndicator } from '../components/HealthIndicator';

export function StudentsListPage() {
  return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Title order={2}>Resumen de APIs</Title>
        <Text c="dimmed">
          Selecciona un alumno para ver el estado de su API y ejecutar cada endpoint.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {students.map((student) => (
          <Card
            key={student.id}
            component={Link}
            to={`/students/${student.id}`}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Stack gap="sm">
              <Group justify="space-between">
                <Title order={4}>{student.name}</Title>
                <Badge variant="light">API</Badge>
              </Group>
              <Text size="sm" c="dimmed">
                {student.baseUrl}
              </Text>
              <HealthIndicator baseUrl={student.baseUrl} healthPath={student.healthPath} />
              <Text size="sm">Endpoints configurados: {student.endpoints.length}</Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
