import {
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Group,
} from "@mantine/core";
import { useState } from "react";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Add your API call here
    console.log("Login Submitted:", values);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Paper
        withBorder
        shadow="md"
        radius="md"
        p="xl"
        style={{ width: 380, maxWidth: "90%" }}
      >
        <Title order={2} ta="center" mb="md" fw={700}>
          Smart Campus Login
        </Title>

        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          mb="sm"
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          mb="sm"
        />

        <Group justify="space-between" mb="sm">
          <Anchor size="sm" href="#">
            Forgot password?
          </Anchor>
        </Group>

        <Button fullWidth mt="md" onClick={handleSubmit} disabled={!values?.email || !values?.password}>
          Login
        </Button>

        <Text fz="xs" c="dimmed" ta="center" mt="sm">
          © {new Date().getFullYear()} Developed by leo.
        </Text>
      </Paper>
    </div>
  );
}
