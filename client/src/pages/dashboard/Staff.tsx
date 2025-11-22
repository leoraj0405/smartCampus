// src/pages/dashboard/Staff.tsx
import { Card, Table, Text, Group, Button } from "@mantine/core";

const data = [
  { id: 1, name: "Prof. Suresh", department: "Computer Science", role: "HOD" },
  { id: 2, name: "Mrs. Priya", department: "Mathematics", role: "Lecturer" },
  { id: 3, name: "Mr. John", department: "Administration", role: "Clerk" },
];

export default function Staff() {
  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" mb="md">
        <div>
          <Text fw={600}>Staff</Text>
          <Text fz="xs" c="dimmed">
            Teaching and non-teaching staff records
          </Text>
        </div>
        <Button size="xs">Add Staff</Button>
      </Group>

      <Table striped withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Department</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row) => (
            <Table.Tr key={row.id}>
              <Table.Td>{row.name}</Table.Td>
              <Table.Td>{row.department}</Table.Td>
              <Table.Td>{row.role}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
