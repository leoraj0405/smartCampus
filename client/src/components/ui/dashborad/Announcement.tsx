import { Avatar, Group, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function Announcement({ text, time, priority }: any) {
  const priorityColors: any = {
    info: 'blue',
    normal: 'gray',
    warning: 'orange',
    urgent: 'red',
  };

  return (
    <Group align="flex-start" spacing="sm" noWrap>
      <Avatar size={32} radius="xl" color={priorityColors[priority]}>
        <IconAlertCircle size={16} />
      </Avatar>
      <div style={{ flex: 1 }}>
        <Text size="sm" style={{ lineHeight: 1.3 }}>{text}</Text>
        <Text size="xs" c="dimmed" mt={4}>{time}</Text>
      </div>
    </Group>
  );
}