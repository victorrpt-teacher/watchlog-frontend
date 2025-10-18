import {
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Text,
  Title,
  NavLink,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { studentGroups } from './config/students';
import { StudentsListPage } from './pages/StudentsList';
import { StudentDashboardPage } from './pages/StudentDashboard';

function App() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();

  return (
    <AppShell
      header={{
        height: 60,
      }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3}>WatchLog Dashboard</Title>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <ScrollArea style={{ height: 'calc(100vh - 120px)' }}>
          <Stack gap="xs">
            <Text fw={600} size="sm" px="xs">
              Alumnos
            </Text>
            <NavLink
              label="Resumen general"
              component={Link}
              to="/"
              variant={location.pathname === '/' ? 'filled' : 'subtle'}
              onClick={() => close()}
            />
            {studentGroups.map((group) => (
              <Stack key={group.id} gap="xs" mt="xs">
                <Text size="xs" fw={600} c="dimmed" px="xs">
                  {group.name}
                </Text>
                {group.students.map((student) => {
                  const href = `/students/${student.id}`;
                  return (
                    <NavLink
                      key={student.id}
                      label={student.name}
                      description={student.baseUrl}
                      component={Link}
                      to={href}
                      active={location.pathname === href}
                      onClick={() => close()}
                      style={{ marginLeft: 12 }}
                    />
                  );
                })}
              </Stack>
            ))}
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<StudentsListPage />} />
          <Route path="/students/:studentId" element={<StudentDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
