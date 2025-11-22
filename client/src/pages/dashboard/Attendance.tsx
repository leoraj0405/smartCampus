// src/pages/dashboard/Attendance.tsx
import { Card, Text, Group, Select, Button, Table } from "@mantine/core";

const rows = [
  { id: 1, date: "22-11-2025", className: "BCA - 2nd Year", present: "45 / 50" },
  { id: 2, date: "22-11-2025", className: "Class 9 - B", present: "38 / 40" },
];

export default function Attendance() {
  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" mb="md">
        <div>
          <Text fw={600}>Attendance</Text>
          <Text fz="xs" c="dimmed">
            Class wise daily attendance
          </Text>
        </div>
        <Group gap="xs">
          <Select
            placeholder="Select class"
            data={["All", "BCA", "B.Sc", "Class 9", "Class 10"]}
            size="xs"
          />
          <Button size="xs">Filter</Button>
        </Group>
      </Group>

      <Table striped withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Class</Table.Th>
            <Table.Th>Present</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((r) => (
            <Table.Tr key={r.id}>
              <Table.Td>{r.date}</Table.Td>
              <Table.Td>{r.className}</Table.Td>
              <Table.Td>{r.present}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
