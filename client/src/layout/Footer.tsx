import { Group, Text, Divider, Anchor } from "@mantine/core";

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
          © {new Date().getFullYear()} Developed by <Anchor
            href="https://portfolio-three-rouge-i0duqvzsdo.vercel.app/"
            target="_blank"
            underline="always"
          >
            Leo
          </Anchor>
        </Text>
      </Group>
    </>
  );
}