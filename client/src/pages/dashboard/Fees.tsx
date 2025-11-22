// src/pages/dashboard/Fees.tsx
import { Card, Text, Group, Button, Table } from "@mantine/core";

const rows = [
  { id: 1, name: "Rahul Kumar", className: "BCA - 2nd Year", due: "₹ 15,000" },
  { id: 2, name: "Anjali Singh", className: "B.Sc - 1st Year", due: "₹ 10,000" },
];

export default function Fees() {
  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" mb="md">
        <div>
          <Text fw={600}>Fees</Text>
          <Text fz="xs" c="dimmed">
            Fee collection and outstanding summary
          </Text>
        </div>
        <Button size="xs">Add Payment</Button>
      </Group>

      <Table striped withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Student</Table.Th>
            <Table.Th>Class</Table.Th>
            <Table.Th>Due Amount</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((r) => (
            <Table.Tr key={r.id}>
              <Table.Td>{r.name}</Table.Td>
              <Table.Td>{r.className}</Table.Td>
              <Table.Td>{r.due}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
