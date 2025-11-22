import {
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Group,
  useMantineTheme,
  Select,
} from "@mantine/core";
import { useState } from "react";
import { loginApiServices } from "../../components/api/api.services";
import { Notification } from "../../components/utils/utils";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: 'Admin'
  });

  const theme = useMantineTheme();
  // Get the primary color from the theme (default is blue)
  const primaryColor = theme.colors[theme.primaryColor][6];

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async() => {
    try {
      const response = await loginApiServices(values);
      if(response.status === 200) {
        localStorage.setItem('token', response?.data?.token)
        localStorage.setItem('profileImage', response?.data?.userData?.profileImage || '')
        navigate('/dashboard')
      }
    } catch (error: any) {
      if(error?.status === 404) {
        Notification({
          message: "Invalid email or password. Kindly verify your credentials and try once more.",
          title: "Error",
          isError: true
        });
      }else {
        Notification({
          message: "Something went wrong.",
          title: "Error",
          isError: true
        });

      }
    }
  };

  // Check if all required fields are filled and passwords match
  const isFormValid = isLogin
    ? !!values.email && !!values.password
    : !!values.email && !!values.password && !!values.confirmPassword && values.password === values.confirmPassword;

  // Dynamic content based on the current view
  const title = isLogin ? "Smart Campus Login" : "Create New Account in Smart";
  const buttonText = isLogin ? "Login" : "Sign Up";
  const toggleText = isLogin ? "Don't have an account?" : "Already have an account?";
  const toggleActionText = isLogin ? "Sign Up" : "Login";

  return (
    <div
      style={{
        // Using a very light grey or white background for a professional, clean look
        backgroundColor: theme.colors.gray[1],
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing.md,
      }}
    >
      <Paper
        withBorder
        shadow="xl"
        radius="lg"
        p="xl"
        style={{ width: 400, maxWidth: "95%", backgroundColor: theme.white }}
      >
        {/* Title using the primary color */}
        <Title order={2} ta="center" mb="lg" fw={700} style={{ color: primaryColor }}>
          {title}
        </Title>

        {/* Form Fields */}
        <TextInput
          label="Email"
          placeholder="your.id@campus.edu"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          mb="sm"
        />

        <Select
          label="Role"
          value={values.role}
          placeholder="Select your role"
          data={['Admin', 'Staff', 'Student']}
          onChange={(value) => handleChange("role",  value || 'Admin')}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          mb="sm"
        />

        {!isLogin && (
          <PasswordInput
            label="Confirm Password"
            placeholder="Repeat password"
            value={values.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            required
            mb="sm"
          />
        )}

        {/* Action Group */}
        <Group justify="space-between" mb="lg">
          {isLogin && (
            <Anchor size="sm" href="#" style={{ color: primaryColor }}>
              Forgot password?
            </Anchor>
          )}

          <Text fz="sm" c="dimmed">
            {toggleText}{" "}
            <Anchor
              size="sm"
              onClick={() => {
                setValues({ email: "", password: "", confirmPassword: "", role: 'Admin' });
                setIsLogin((prev) => !prev);
              }}
              // Toggle link also uses the primary color
              style={{ color: primaryColor, fontWeight: 600 }}
            >
              {toggleActionText}
            </Anchor>
          </Text>
        </Group>

        {/* Submit Button - Will use the theme's primary color by default */}
        <Button
          fullWidth
          mt="md"
          onClick={handleSubmit}
          disabled={!isFormValid}
        // Button uses default theme primary color, which is professional
        >
          {buttonText}
        </Button>

        {/* Footer Text */}
        <Text fz="xs" c="dimmed" ta="center" mt="xl">
          © {new Date().getFullYear()} Developed by <Anchor
            href="https://portfolio-three-rouge-i0duqvzsdo.vercel.app/"
            target="_blank"
            underline="always"
          >
            Leo
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}