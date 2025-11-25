import {
  Stack,
  NavLink,
  Tooltip,
  ActionIcon,
  Group,
  Text,
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
      }}
    >
      {/* Mobile top bar: close button */}
      {isMobile && (
        <Group justify="space-between" mb="xs">
          <Text fw={700}>Smart campus</Text>
          <ActionIcon variant="subtle" onClick={closeMobile}>
            <IconX size={20} />
          </ActionIcon>
        </Group>
      )}

      {/* DESKTOP collapse toggle */}
      {!isMobile && (
        <Group justify="flex-start">
          <ActionIcon variant="subtle" onClick={toggle}>
            {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
          </ActionIcon>
        </Group>
      )}

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
            variant="light"
            color="blue"
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
            variant="light"
            color="blue"
          />
        ))
      }

      {/* DESKTOP COLLAPSED MODE */}
      {!isMobile && collapsed &&
        links.map((item) => (
          <Tooltip key={item.path} label={item.label} position="right">
            <ActionIcon
              component={Link}
              to={item.path}
              variant={pathname === item.path ? "filled" : "light"}
              color={pathname === item.path ? "blue" : "gray"}
              radius="md"
              size="lg"
            >
              <item.icon size={20} />
            </ActionIcon>
          </Tooltip>
        ))
      }
    </Stack>
  );
}
