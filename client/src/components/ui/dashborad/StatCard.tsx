// src/components/ui/StatCard.tsx
import { Badge, Card, Group, Progress, Stack, Text, ThemeIcon } from "@mantine/core";

export default function AdvancedStatCard({ title, value, change, description, icon, color, progress }: any) {
  const colorMap: any = {
    blue: '#3b82f6',
    green: '#10b981',
    orange: '#f59e0b',
    red: '#ef4444',
  };

  return (
    <Card withBorder radius="lg" p="lg" style={{ position: 'relative', overflow: 'hidden' }}>
      <ThemeIcon
        size={60}
        radius="md"
        variant="filled"
        style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}
      >
        {icon}
      </ThemeIcon>
      
      <Stack spacing="xs">
        <Text size="sm" c="dimmed" fw={500}>{title}</Text>
        <Group spacing="xs" align="flex-end">
          <Text fw={700} size="xl">{value}</Text>
          <Badge 
            variant="light"
            size="sm"
          >
            {change}
          </Badge>
        </Group>
        <Text size="xs" c="dimmed">{description}</Text>
        <Progress value={progress} color={colorMap[color]} size="sm" radius="xl" />
      </Stack>
    </Card>
  );
}

