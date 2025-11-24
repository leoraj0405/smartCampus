import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

// This component uses only Mantine components to create a responsive, centered 404 error page.
// We use Box and Mantine's built-in styling props (like 'h' for height) for the layout.
const NotFound404 = () => {
    const navigate = useNavigate()
  // Function to simulate navigation back to the home page
  const handleGoHome = () => {
    // In a real application, you would use React Router's navigate function here,
    // e.g., navigate('/'); or window.location.href = '/';
    navigate('/admindashboard')
  };
  


  return (
    <Box 
      h="100vh" 
      w="100vw"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Responsive styling using Mantine's responsive values is usually done via hooks or `style`/`sx` props
        // but here we focus on the core layout components.
      }}
    >
      <Container size="md" ta="center">
        {/* Large, attention-grabbing error code */}
        <Title 
          order={1} 
          style={{
            fontSize: 'clamp(5rem, 20vw, 10rem)', // Fluid size for 404
            fontWeight: 900,
          }}
        >
          404
        </Title>
        
        {/* Main Error Message */}
        <Title order={2} mt="md" mb="xs" style={{ fontWeight: 600 }}>
          You have found a secret place.
        </Title>

        {/* Descriptive Text */}
        <Text c="dimmed" size="lg" mb="xl">
          Unfortunately, this is an error page. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Text>

        {/* Action Buttons */}
        <Group justify="center" mt="xl">
          <Button 
            variant="filled" 
            size="lg"
            radius="md"
            onClick={handleGoHome}
            style={{
              boxShadow: 'var(--mantine-shadow-xl)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            Take me back to the home page
          </Button>
        </Group>
      </Container>
      
      {/* Custom Message Box for simulating alerts */}
      <div 
        id="message-box" 
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          color: 'white',
          borderRadius: 'var(--mantine-radius-md)',
          boxShadow: 'var(--mantine-shadow-lg)',
          opacity: 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: 'none',
          zIndex: 1000,
        }}
      >
        Simulating navigation back to the home page.
      </div>
    </Box>
  );
};

export default NotFound404;