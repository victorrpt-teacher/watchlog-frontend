import { useState } from 'react';
import {
  Anchor,
  Badge,
  Button,
  Code,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { IconArrowRight, IconRefresh } from '@tabler/icons-react';
import type { EndpointConfig } from '../config/students';

export interface EndpointRunnerProps {
  baseUrl: string;
  endpoint: EndpointConfig;
  defaultPayload?: string;
}

type RequestState = 'idle' | 'pending' | 'success' | 'error';

const methodColors: Record<string, string> = {
  GET: 'blue',
  POST: 'green',
  PUT: 'yellow',
  PATCH: 'orange',
  DELETE: 'red',
};

export function EndpointRunner({ baseUrl, endpoint, defaultPayload }: EndpointRunnerProps) {
  const [requestState, setRequestState] = useState<RequestState>('idle');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>('');
  const [payload, setPayload] = useState(defaultPayload ?? '');

  const url = new URL(endpoint.path, baseUrl).toString();
  const isRead = endpoint.method === 'GET';

  const handleSubmit = async () => {
    setRequestState('pending');
    setResponseBody('');
    setResponseStatus(null);

    const config: AxiosRequestConfig = {
      method: endpoint.method,
      url,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'WatchLog-Frontend',
        'Cache-Control': 'no-cache',
      },
    };

    try {
      const data = isRead || payload.trim() === '' ? undefined : JSON.parse(payload);
      const response = await axios.request({
        ...config,
        data,
      });

      setResponseStatus(response.status);
      setResponseBody(JSON.stringify(response.data, null, 2));
      setRequestState('success');
    } catch (error) {
      const axiosError = error as AxiosError;
      setResponseStatus(axiosError.response?.status ?? null);

      if (axiosError.response?.data) {
        setResponseBody(JSON.stringify(axiosError.response.data, null, 2));
      } else {
        setResponseBody(axiosError.message);
      }

      setRequestState('error');
    }
  };

  const handleReset = () => {
    setRequestState('idle');
    setResponseBody('');
    setResponseStatus(null);
  };

  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="sm">
        <Group justify="space-between">
          <Stack gap={0}>
            <Group gap="xs">
              <Badge color={methodColors[endpoint.method] ?? 'gray'}>{endpoint.method}</Badge>
              <Text fw={600}>{endpoint.label}</Text>
            </Group>
            <Anchor href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </Anchor>
          </Stack>
          <Group gap="xs">
            <Button
              size="compact-sm"
              variant="subtle"
              onClick={handleReset}
              leftSection={<IconRefresh size={16} />}
              disabled={requestState === 'pending'}
            >
              Limpiar
            </Button>
            <Button
              size="compact-sm"
              onClick={handleSubmit}
              loading={requestState === 'pending'}
              leftSection={<IconArrowRight size={16} />}
            >
              Ejecutar
            </Button>
          </Group>
        </Group>

        {!isRead && (
          <Stack gap="xs">
            <Title order={6}>Payload</Title>
            <Textarea
              autosize
              minRows={3}
              value={payload}
              onChange={(event) => setPayload(event.currentTarget.value)}
              placeholder='{"title": "Película", "genre": "Drama"}'
              spellCheck={false}
            />
          </Stack>
        )}

        <Stack gap="xs">
          <Title order={6}>Respuesta</Title>
          {responseStatus !== null && (
            <Badge color={requestState === 'success' ? 'green' : 'red'}>
              HTTP {responseStatus}
            </Badge>
          )}
          <Code block style={{ whiteSpace: 'pre-wrap' }}>
            {responseBody || (requestState === 'idle' ? 'Sin ejecutar aún.' : 'Sin contenido.')}
          </Code>
        </Stack>
      </Stack>
    </Paper>
  );
}
