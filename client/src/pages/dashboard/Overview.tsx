// src/pages/dashboard/Overview.tsx
import { Grid, Card, Text } from "@mantine/core";
import { IconUsers, IconSchool, IconCalendarStats, IconCurrencyRupee } from "@tabler/icons-react";
import StatCard from "../../components/ui/StatCard";

export default function Overview() {
  return (
    <>
      <Grid mb="md">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Students"
            value="1,250"
            description="Active in current academic year"
            icon={<IconUsers size={24} />}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Staff"
            value="120"
            description="Teaching & non-teaching"
            icon={<IconSchool size={24} />}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Today Attendance"
            value="92%"
            description="Average across all classes"
            icon={<IconCalendarStats size={24} />}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Fees"
            value="₹ 4,50,000"
            description="This month outstanding"
            icon={<IconCurrencyRupee size={24} />}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder radius="md" p="md">
            <Text fw={600} mb="xs">
              Quick Summary
            </Text>
            <Text fz="sm" c="dimmed">
              This is a placeholder for charts (attendance trends, fee collection, etc.). You can integrate Recharts
              or any other chart library here.
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder radius="md" p="md">
            <Text fw={600} mb="xs">
              Upcoming Events
            </Text>
            <Text fz="sm" c="dimmed">
              • Parent–Teacher meeting – 25 Nov{"\n"}
              • Semester exam schedule release – 30 Nov{"\n"}
              • Annual day – 15 Dec
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
