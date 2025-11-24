import {
  Stack,
  NavLink,
  Tooltip,
  ActionIcon,
  Group,
  Text,
  Box,
  Divider,
} from "@mantine/core";
import { useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useSidebarStore } from "../store/sidebarStore";

import {
  IconDashboard,
  IconUsers,
  IconSchool,
  IconCalendarStats,
  IconCurrencyRupee,
  IconMessageCircle2,
  IconChevronRight,
  IconChevronLeft,
  IconX,
  IconBuilding,
} from "@tabler/icons-react";

const links = [
  { label: "Dashboard", icon: IconDashboard, path: "/dashboard" },
  { label: "Students", icon: IconUsers, path: "/dashboard/students" },
  { label: "Staff", icon: IconSchool, path: "/dashboard/staff" },
  { label: "Attendance", icon: IconCalendarStats, path: "/dashboard/attendance" },
  { label: "Fees", icon: IconCurrencyRupee, path: "/dashboard/fees" },
  { label: "Chat", icon: IconMessageCircle2, path: "/dashboard/chat" },
];

export default function Sidebar({ mobileOpen, closeMobile }: any) {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Zustand collapse (desktop only)
  const collapsed = useSidebarStore((s) => s.collapsed);
  const toggle = useSidebarStore((s) => s.toggle);

  return (
    <Stack
      gap="xs"
      p="md"
      style={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
        borderRight: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      {/* Mobile top bar: close button */}
      {isMobile && (
        <>
          <Group justify="space-between" mb="xs">
            <Group gap="sm">
              <IconBuilding size={24} style={{ opacity: 0.7 }} />
              <Text fw={700} size="lg">Smart Campus</Text>
            </Group>
            <ActionIcon 
              variant="subtle" 
              onClick={closeMobile}
              size="lg"
              style={{ 
                border: "1px solid var(--mantine-color-gray-3)",
              }}
            >
              <IconX size={18} />
            </ActionIcon>
          </Group>
          <Divider my="sm" />
        </>
      )}

      {/* DESKTOP collapse toggle */}
      {!isMobile && (
        <Group justify="flex-end" mb="sm">
          <ActionIcon 
            variant="subtle" 
            onClick={toggle}
            size="md"
            style={{ 
              border: "1px solid var(--mantine-color-gray-3)",
            }}
          >
            {collapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
          </ActionIcon>
        </Group>
      )}

      {/* Navigation Links */}
      <Stack gap={4}>
        {/* Always show FULL sidebar on mobile if mobileOpen === true */}
        {(isMobile && mobileOpen && !collapsed) &&
          links.map((item) => (
            <NavLink
              key={item.path}
              component={Link}
              to={item.path}
              label={item.label}
              leftSection={<item.icon size={20} />}
              active={pathname === item.path}
              variant="subtle"
              style={{
                borderRadius: "var(--mantine-radius-md)",
                border: pathname === item.path ? "1px solid var(--mantine-color-blue-3)" : "1px solid transparent",
                fontWeight: pathname === item.path ? 600 : 400,
                transform: "translateY(0)",
                transition: "all 0.2s ease",
              }}
              styles={{
                label: {
                  fontSize: "var(--mantine-font-size-sm)",
                }
              }}
              onClick={closeMobile}
            />
          ))
        }

        {/* DESKTOP FULL MODE */}
        {!isMobile && !collapsed &&
          links.map((item) => (
            <NavLink
              key={item.path}
              component={Link}
              to={item.path}
              label={item.label}
              leftSection={<item.icon size={20} />}
              active={pathname === item.path}
              variant="subtle"
              style={{
                borderRadius: "var(--mantine-radius-md)",
                border: pathname === item.path ? "1px solid var(--mantine-color-blue-3)" : "1px solid transparent",
                fontWeight: pathname === item.path ? 600 : 400,
                transform: "translateY(0)",
                transition: "all 0.2s ease",
              }}
              styles={{
                label: {
                  fontSize: "var(--mantine-font-size-sm)",
                },
                root: {
                  "&:hover": {
                    transform: "translateY(-1px)",
                    border: "1px solid var(--mantine-color-gray-3)",
                  },
                }
              }}
            />
          ))
        }

        {/* DESKTOP COLLAPSED MODE */}
        {!isMobile && collapsed &&
          links.map((item) => (
            <Tooltip 
              key={item.path} 
              label={item.label} 
              position="right"
              withArrow
              offset={10}
            >
              <ActionIcon
                component={Link}
                to={item.path}
                variant={pathname === item.path ? "filled" : "subtle"}
                size="xl"
                style={{
                  border: pathname === item.path 
                    ? "1px solid var(--mantine-color-blue-3)" 
                    : "1px solid var(--mantine-color-gray-3)",
                  borderRadius: "var(--mantine-radius-md)",
                  transform: "translateY(0)",
                  transition: "all 0.2s ease",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      transform: "translateY(-1px)",
                      border: "1px solid var(--mantine-color-gray-4)",
                    },
                  }
                }}
              >
                <item.icon size={20} />
              </ActionIcon>
            </Tooltip>
          ))
        }
      </Stack>

      {/* Bottom spacing */}
      <Box style={{ flex: 1 }} />

      {/* User info or additional content can go here */}
      {!isMobile && !collapsed && (
        <Box 
          p="sm" 
          style={{ 
            border: "1px solid var(--mantine-color-gray-3)",
            borderRadius: "var(--mantine-radius-md)",
          }}
        >
          <Text size="sm" fw={500}>Campus Admin</Text>
          <Text size="xs" style={{ opacity: 0.7 }}>admin@smartcampus.edu</Text>
        </Box>
      )}

      {!isMobile && collapsed && (
        <Tooltip label="Campus Admin" position="right" withArrow>
          <ActionIcon 
            variant="subtle" 
            size="xl"
            style={{ 
              border: "1px solid var(--mantine-color-gray-3)",
              borderRadius: "var(--mantine-radius-md)",
            }}
          >
            <IconUsers size={20} />
          </ActionIcon>
        </Tooltip>
      )}
    </Stack>
  );
}