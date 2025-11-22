import {
  Group,
  Text,
  Burger,
  ActionIcon,
  Menu,
  Avatar,
  TextInput,
  // 💡 Import Transition
  Transition,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconSearch,
  IconBell,
  IconUser,
  IconLogout,
  IconX,
  IconClock,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function TopHeader({ openMobileSidebar }: any) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [mode, setMode] = useState<"normal" | "search" | "time">("normal");
  const [dateTime, setDateTime] = useState("");

  // Live Date + Time
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setDateTime(
        now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
          " • " +
          now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const profileImage = localStorage.getItem("profileImage");
  const avatarUrl = profileImage
    ? `${import.meta.env.VITE_SERVER_URL}uploads/${profileImage}`
    : null;

  // Helper function to handle mode changes with a slight delay
  // to allow the animation to complete before rendering the new content.
  // We'll use the Transition component instead, which is cleaner.

  return (
    <Group
      px="md"
      h={60}
      justify="space-between"
      align="center"
    >
      {/* LEFT SIDE (No Change) */}
      <Group gap="sm">
        {isMobile && mode === "normal" && (
          <Burger size="sm" onClick={openMobileSidebar} />
        )}

        {!isMobile ? (
          <Text fw={700} fz="lg">
            Smart Campus
          </Text>
        ) : (
          <Avatar
            src={`/logo.png`}
            alt="Logo"
            size="md"
            radius="xl"
            style={{ cursor: "pointer" }}
          />
        )}
      </Group>

      {/* RIGHT SIDE (Wrapped in Transition) */}
      <Group gap="md" align="center" style={{ flex: 1, justifyContent: "flex-end" }}>
        {/* ⭐ MOBILE SEARCH MODE ⭐ */}
        {isMobile && mode === "search" && (
          // Apply Transition for smoother appearance
          <Transition mounted={mode === "search"} transition="fade" duration={200} timingFunction="ease">
            {(styles) => (
              <Group style={{ width: "100%", ...styles }} justify="space-between" align="center">
                <TextInput
                  placeholder="Search..."
                  autoFocus
                  radius="md"
                  style={{ flex: 1 }}
                  rightSection={<IconSearch size={18} />}
                />
                <ActionIcon
                  variant="subtle"
                  onClick={() => setMode("normal")}
                  radius="md"
                >
                  <IconX size={20} />
                </ActionIcon>
              </Group>
            )}
          </Transition>
        )}

        {/* ⭐ MOBILE TIME MODE ⭐ */}
        {isMobile && mode === "time" && (
          // Apply Transition for smoother appearance
          <Transition mounted={mode === "time"} transition="fade" duration={200} timingFunction="ease">
            {(styles) => (
              <Group style={{ width: "100%", ...styles }} justify="space-between" align="center">
                <Text fw={600}>{dateTime}</Text>
                <ActionIcon
                  variant="subtle"
                  onClick={() => setMode("normal")}
                  radius="md"
                >
                  <IconX size={20} />
                </ActionIcon>
              </Group>
            )}
          </Transition>
        )}

        {/* ⭐ NORMAL HEADER MODE ⭐ */}
        {mode === "normal" && (
          // Apply Transition for smoother appearance
          <Transition mounted={mode === "normal"} transition="fade" duration={200} timingFunction="ease">
            {(styles) => (
              <Group gap="md" align="center" style={styles}>
                {/* Mobile Time Icon */}
                {isMobile && (
                  <ActionIcon variant="subtle" radius="md" onClick={() => setMode("time")}>
                    <IconClock size={20} />
                  </ActionIcon>
                )}

                {/* Desktop Time */}
                {!isMobile && (
                  <Text size="sm" c="dimmed" style={{ minWidth: 140 }}>
                    {dateTime}
                  </Text>
                )}

                {/* Desktop Search */}
                {!isMobile && (
                  <TextInput
                    placeholder="Search..."
                    rightSection={<IconSearch size={18} />}
                    radius="md"
                    style={{ width: 260 }}
                  />
                )}

                {/* Mobile Search Icon */}
                {isMobile && (
                  <ActionIcon variant="subtle" radius="md" onClick={() => setMode("search")}>
                    <IconSearch size={20} />
                  </ActionIcon>
                )}

                {/* Notifications */}
                <ActionIcon variant="subtle" radius="md" size="lg">
                  <IconBell size={20} />
                </ActionIcon>

                {/* Avatar Menu */}
                <Menu width={200} shadow="md" position="bottom-end">
                  <Menu.Target>
                    <Avatar
                      src={avatarUrl}
                      alt="Profile"
                      size="md"
                      radius="xl"
                      style={{ cursor: "pointer" }}
                    >
                      {!avatarUrl && "US"}
                    </Avatar>
                  </Menu.Target>

                  <Menu.Dropdown style={{ borderRadius: 12, padding: 8 }}>
                    <Menu.Item leftSection={<IconUser size={18} />}>
                      My Profile
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                      component="a"
                      href={`${import.meta.env.VITE_UI_URL}/login`}
                      leftSection={<IconLogout size={18} />}
                      color="red"
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <ThemeToggle />
              </Group>
            )}
          </Transition>
        )}
      </Group>
    </Group>
  );
}