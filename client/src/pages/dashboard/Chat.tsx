// src/pages/dashboard/Chat.tsx
import { Card, Text, Group, ScrollArea, Stack, Textarea, Button } from "@mantine/core";

const messages = [
  { id: 1, from: "Admin", text: "Welcome to Smart Campus chat." },
  { id: 2, from: "Staff", text: "We will update exam schedule soon." },
];

export default function Chat() {
  return (
    <Card withBorder radius="md" p="md" h="100%">
      <Group justify="space-between" mb="md">
        <div>
          <Text fw={600}>Chat</Text>
          <Text fz="xs" c="dimmed">
            One-to-one and group communication (UI only)
          </Text>
        </div>
      </Group>

      <ScrollArea h={300} mb="md">
        <Stack gap="xs">
          {messages.map((m) => (
            <Card key={m.id} padding="xs" radius="md" withBorder>
              <Text fw={600} fz="xs">
                {m.from}
              </Text>
              <Text fz="sm">{m.text}</Text>
            </Card>
          ))}
        </Stack>
      </ScrollArea>

      <Stack gap="xs">
        <Textarea placeholder="Type a message..." minRows={2} />
        <Group justify="flex-end">
          <Button size="xs">Send</Button>
        </Group>
      </Stack>
    </Card>
  );
}
