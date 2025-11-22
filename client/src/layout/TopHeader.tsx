import { Group, Text, Burger, ActionIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconSearch, IconBell } from "@tabler/icons-react";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function TopHeader({ openMobileSidebar }: any) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Group
      px="md"
      h="100%"
      justify="space-between"
      align="center"
    >
      <Group gap="sm" align="center">
        {isMobile && <Burger size="sm" onClick={openMobileSidebar} />}

        <Text fw={700} fz="lg">
          Smart Campus
        </Text>
      </Group>

      <Group gap="md" align="center">
        <ActionIcon variant="subtle"><IconSearch size={18} /></ActionIcon>
        <ActionIcon variant="subtle"><IconBell size={18} /></ActionIcon>

        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--mantine-color-blue-0)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          SC
        </div>

        <ThemeToggle />
      </Group>
    </Group>
  );
}
