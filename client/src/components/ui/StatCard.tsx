// src/components/ui/StatCard.tsx
import { Card, Group, Text } from "@mantine/core";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: any;
}

export default function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Group justify="space-between" align="flex-start" mb="sm">
        <div>
          <Text fz="xs" c="dimmed">
            {title}
          </Text>
          <Text fw={700} fz="xl">
            {value}
          </Text>
        </div>
        {icon}
      </Group>
      {description && (
        <Text fz="xs" c="dimmed">
          {description}
        </Text>
      )}
    </Card>
  );
}
