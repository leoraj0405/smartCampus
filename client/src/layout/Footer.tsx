import { Group, Text, Divider } from "@mantine/core";

export default function Footer() {
  return (
    <>
      <Divider />

      <Group
        justify="center"
        align="center"
        px="md"
        py="sm"
        style={{ opacity: 0.9 }}
      >
        <Text fz="xs" c="dimmed">
          © {new Date().getFullYear()} Developed by leo.
        </Text>
      </Group>
    </>
  );
}