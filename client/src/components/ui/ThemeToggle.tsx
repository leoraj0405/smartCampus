import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="subtle"
      onClick={() => setColorScheme(dark ? "light" : "dark")}
      size="lg"
    >
      {dark ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
}
