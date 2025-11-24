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
import { login } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = async () => {
    try {
      const response = await loginApiServices(values);
      if (response.status === 200) {
        console.log(response)
        dispatch(
          login({
            userData: {...response.data.userData, role: values?.role},
            token: response.data.token,
          })
        );
        if(values?.role === 'Admin') {
          navigate('/admindashboard')
        } 
        if(values?.role === 'Staff') {
          navigate('/staffdashboard')
        }
        if(values?.role === 'Student') {
          navigate('/studentdasboard')
        }
        
      }
    } catch (error: any) {
      if (error?.status === 401 || error?.status === 404) {
        Notification({
          message: "Invalid email or password. Kindly verify your credentials and try once more.",
          title: "Error",
          isError: true
        });
      } else {
        console.log(error)
        Notification({
          message: "Something went wrong.",
          title: "Error",
          isError: true
        });

      }
    }
  };

  // Check if all required fields are filled and passwords match
  const isFormValid = !!values.email && !!values.password


  return (
    <div
      style={{
        // Using a very light grey or white background for a professional, clean look
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
        style={{ width: 400, maxWidth: "95%" }}
      >
        {/* Title using the primary color */}
        <Title order={2} ta="center" mb="lg" fw={700} style={{ color: primaryColor }}>
          Smart Login
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
          onChange={(value) => handleChange("role", value || 'Admin')}
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

        {/* Action Group */}
        <Group justify="flex-end" mb="lg">
          <Anchor size="sm" href="#" style={{ color: primaryColor }}>
            Forgot password?
          </Anchor>
        </Group>

        {/* Submit Button - Will use the theme's primary color by default */}
        <Button
          fullWidth
          mt="md"
          onClick={handleSubmit}
          disabled={!isFormValid}
        // Button uses default theme primary color, which is professional
        >
          Login
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