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
} from '@mantine/core';
import { IconMail, IconLock, IconUser } from '@tabler/icons-react';
import { authCardStyle } from '../../styles/auth.style';

export default function Signup() {
    return (
        <Center h="100vh" bg="gray.1">
            <Paper p="xl" radius="md" shadow="sm" style={authCardStyle}>
                <Stack gap="md">
                    {/* Logo */}
                    <Center>
                        <Image
                            src="/logo.svg"
                            alt="App Logo"
                            w={48}
                        />
                    </Center>

                    <Text ta="center" fw={600} size="lg">
                        Create account
                    </Text>
                    <Text ta="center" size="sm" c="dimmed">
                        Get started with your account
                    </Text>

                    <TextInput
                        label="Full name"
                        placeholder="John Doe"
                        leftSection={<IconUser size={16} />}
                        required
                    />

                    <TextInput
                        label="Email"
                        placeholder="john@example.com"
                        leftSection={<IconMail size={16} />}
                        required
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="••••••••"
                        leftSection={<IconLock size={16} />}
                        required
                    />

                    <PasswordInput
                        label="Confirm password"
                        placeholder="••••••••"
                        leftSection={<IconLock size={16} />}
                        required
                    />

                    <Button fullWidth mt="sm">
                        Sign up
                    </Button>

                    <Text size="sm" ta="center">
                        Already have an account?{' '}
                        <Anchor href="/login">Login</Anchor>
                    </Text>
                </Stack>
            </Paper>
        </Center>
    );
}
