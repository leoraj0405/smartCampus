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
import useLoginHook from '../../hooks/auth/useLogin';

export default function Login() {
  const {
    handleLogin,
    btnLoading,
    setEmailId,
    emailId,
    setPassword,
    password,
    role,
    setRole
  } = useLoginHook();

    const handleRoleChange = (e: string | null) => {
      if(e === 'admin') {
        setRole('admin')
      }
      if(e === 'staff') {
        setRole('staff')
      }
      if(e === 'student') {
        setRole('student')
      }
    }
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
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          <Select
            label='Your Role'
            placeholder='Select your role'
            data={['admin', 'staff', 'student']}
            required
            value={role}
            onChange={(e) => handleRoleChange(e)}
          />

          <PasswordInput
            label="Password"
            placeholder="••••••••"
            leftSection={<IconLock size={16} />}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button fullWidth mt="sm" loading={btnLoading} onClick={handleLogin}>
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
