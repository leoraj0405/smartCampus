import { Badge, Group, Paper, Progress, Text } from "@mantine/core";

export default function HostelCard({ name, occupancy, total, warden, color }: any) {
  return (
    <Paper p="md" withBorder radius="md">
      <Group position="apart" align="flex-start" mb="xs">
        <Text fw={600} size="sm">{name}</Text>
        <Badge color={occupancy > 90 ? 'red' : occupancy > 75 ? 'yellow' : 'green'} variant="light">
          {occupancy}%
        </Badge>
      </Group>
      <Progress value={occupancy} color={color} size="md" radius="xl" mb="xs" />
      <Group position="apart">
        <Text size="xs" c="dimmed">{occupancy}/{total} students</Text>
        <Text size="xs" c="dimmed">Warden: {warden.split(' ')[1]}</Text>
      </Group>
    </Paper>
  );
}