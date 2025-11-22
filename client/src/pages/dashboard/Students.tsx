// src/pages/dashboard/Students.tsx
import { Card, Table, Text, Group, Button } from "@mantine/core";

const data = [
  { id: 1, name: "Rahul Kumar", className: "BCA - 2nd Year", rollNo: "BCA2201", status: "Active" },
  { id: 2, name: "Anjali Singh", className: "B.Sc - 1st Year", rollNo: "BSC1107", status: "Active" },
  { id: 3, name: "Mohammed Ali", className: "Class 10 - A", rollNo: "10A-21", status: "Inactive" },
];

export default function Students() {
  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" mb="md">
        <div>
          <Text fw={600}>Students</Text>
          <Text fz="xs" c="dimmed">
            Manage school and college students
          </Text>
        </div>
        <Button size="xs">Add Student</Button>
      </Group>

      <Table striped highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Roll No</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Class</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row) => (
            <Table.Tr key={row.id}>
              <Table.Td>{row.rollNo}</Table.Td>
              <Table.Td>{row.name}</Table.Td>
              <Table.Td>{row.className}</Table.Td>
              <Table.Td>
                <Text c={row.status === "Active" ? "green" : "red"} fw={500}>
                  {row.status}
                </Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
