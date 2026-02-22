import {
  Button,
  PasswordInput,
  TextInput,
  Text,
  Paper,
  Stack,
  Center,
  Image,
  Anchor,
  Select,
} from '@mantine/core';
import { IconMail, IconLock } from '@tabler/icons-react';
import { authCardStyle } from '../../styles/auth.style';

export default function Login() {
  return (
    <Center h="100vh" bg="gray.1">
      <Paper p="xl" radius="md" shadow="sm" style={authCardStyle}>
        <Stack gap="md">
          {/* Logo */}
          <Center>
            <Image
              src="/logo.png"
              alt="App Logo"
              w={180}
              h={70}
            />
          </Center>

          <Text ta="center" fw={600} size="lg">
            Welcome back
          </Text>
          <Text ta="center" size="sm" c="dimmed">
            Sign in to your account
          </Text>

          <TextInput
            label="Email"
            placeholder="admin@example.com"
            leftSection={<IconMail size={16} />}
            required
          />

          <Select
            label='Your Role'
            placeholder='Select your role'
            data={['admin', 'staff', 'student']}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="••••••••"
            leftSection={<IconLock size={16} />}
            required
          />

          <Button fullWidth mt="sm">
            Login
          </Button>

          <Text size="sm" ta="center">
            Don’t have an account?{' '}
            <Anchor href="/signup">Sign up</Anchor>
          </Text>
        </Stack>
      </Paper>
    </Center>
  );
}
