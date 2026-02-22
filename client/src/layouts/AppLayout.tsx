import {
  Box,
  Flex,
  useMantineTheme,
  Container,
  Drawer,
  Paper,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [sidebarOpened, sidebar] = useDisclosure(true);
  const [mobileOpened, mobile] = useDisclosure(false);
  return (
    <>
      <Flex h="100vh" bg="gray.1">
        {/* Mobile Drawer */}
        <Drawer opened={mobileOpened} onClose={mobile.close} hiddenFrom="sm" size={280}>
          <Sidebar
            sidebar={sidebar}
            sidebarOpened={sidebarOpened}
            isMobile={isMobile}
            mobile={mobile}
          />
        </Drawer>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <Box
            w={sidebarOpened ? 280 : 80}
            px="md"
            py="lg"
            bg="white"
            style={{
              borderRight: `1px solid ${theme.colors.gray[3]}`,
              transition: 'width 300ms ease',
            }}
          >
            <Sidebar
              sidebar={sidebar}
              sidebarOpened={sidebarOpened}
              isMobile={isMobile}
              mobile={mobile}
            />
          </Box>
        )}

        {/* Main */}
        <Flex direction="column" flex={1}>
          {/* Header */}
          <Header
            isMobile={isMobile}
            mobile={mobile}
            mobileOpened={mobileOpened}
            sidebar={sidebar}
            sidebarOpened={sidebarOpened}
          />

          {/* Content */}
          <Box flex={1} p="lg" bg={theme.colors.gray[0]} style={{ overflowY: 'auto' }}>
            <Container size="xl">
              <Paper p="lg" radius="md" shadow="sm">
                {children}
                <Outlet />
              </Paper>
            </Container>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
