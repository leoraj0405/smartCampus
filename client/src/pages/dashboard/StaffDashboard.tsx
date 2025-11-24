import React from 'react';
import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Group,
  Table,
  Badge,
  Timeline,
  Paper,
  Avatar,
  Stack,
  Progress,
  Tabs,
  ActionIcon,
  SimpleGrid,
  useMantineTheme,
  Box,
  ScrollArea,
  MantineProvider, // Necessary wrapper for styling if the theme context isn't automatically provided
} from '@mantine/core';
import {
  IconCalendar,
  IconUsers,
  IconClipboardList,
  IconSchool,
  IconBook,
  IconClock,
  IconMapPin,
  IconChartBar,
  IconUserCheck,
  IconAward,
  IconMail,
  IconId,
  IconBriefcase,
  IconChevronsRight,
} from '@tabler/icons-react';

// Custom component for the Quick Stat Cards
const StatCard = ({ label, value, color, icon: Icon, theme }) => (
    <Card shadow="md" p="lg" radius="lg" withBorder>
        <Group position="apart">
            <Stack spacing={4}>
                <Text size="xs" color="dimmed" transform="uppercase" weight={700}>
                    {label}
                </Text>
                <Title order={2} style={{ color: theme.colors[color][6], fontWeight: 800 }}>
                    {value}
                </Title>
            </Stack>
            <Avatar size={50} color={color} variant="light">
                <Icon size={24} style={{ color: theme.colors[color][6] }} />
            </Avatar>
        </Group>
    </Card>
);

const StaffDashboard = () => {
  const theme = useMantineTheme();

  const staffData = {
    name: 'Dr. Sarah Smith',
    department: 'Computer Science',
    designation: 'Professor',
    employeeId: 'CS001',
    email: 'sarah.smith@university.edu'
  };

  const examDuties = [
    { 
      date: '2024-04-15', 
      time: '9:00 AM - 12:00 PM', 
      subject: 'Data Structures', 
      venue: 'Hall A', 
      role: 'Chief Invigilator',
      semester: '3rd',
      students: 65
    },
    { 
      date: '2024-04-18', 
      time: '2:00 PM - 5:00 PM', 
      subject: 'Algorithms', 
      venue: 'Hall B', 
      role: 'Supervisor',
      semester: '4th',
      students: 58
    },
    { 
      date: '2024-04-22', 
      time: '9:00 AM - 12:00 PM', 
      subject: 'Database Systems', 
      venue: 'Lab Complex', 
      role: 'Lab Incharge',
      semester: '3rd',
      students: 45
    },
  ];

  const classes = [
    { subject: 'Data Structures', time: 'Mon, 9:00 AM', students: 45, room: 'A-101', attendance: 92 },
    { subject: 'Algorithms', time: 'Tue, 11:00 AM', students: 42, room: 'A-102', attendance: 88 },
    { subject: 'Database Systems', time: 'Wed, 2:00 PM', students: 38, room: 'Lab-3', attendance: 95 },
    { subject: 'Operating Systems', time: 'Thu, 10:00 AM', students: 40, room: 'B-201', attendance: 90 },
  ];

  const upcomingEvents = [
    { title: 'Department Meeting', date: '2024-03-18', time: '3:00 PM', type: 'Meeting' },
    { title: 'Paper Submission Deadline', date: '2024-03-25', time: '5:00 PM', type: 'Deadline' },
    { title: 'Research Review', date: '2024-04-02', time: '10:00 AM', type: 'Review' },
  ];

  const quickStats = [
    { label: 'Total Classes', value: '12', color: 'blue', icon: IconBook },
    { label: 'Avg. Attendance', value: '91%', color: 'green', icon: IconChartBar },
    { label: 'Pending Duties', value: '3', color: 'orange', icon: IconClipboardList },
    { label: 'Total Students', value: '165', color: 'red', icon: IconUsers },
  ];

  const TimetableData = [
    { time: '9:00-10:00', Mon: { subject: 'Data Structures', room: 'A-101' }, Tue: '-', Wed: { subject: 'Algorithms', room: 'A-102' }, Thu: '-', Fri: { subject: 'Database Systems', room: 'Lab-3' } },
    { time: '11:00-12:00', Mon: '-', Tue: { subject: 'Algorithms', room: 'A-102' }, Wed: '-', Thu: { subject: 'Operating Systems', room: 'B-201' }, Fri: '-' },
    { time: '2:00-3:00', Mon: '-', Tue: '-', Wed: { subject: 'Database Systems', room: 'Lab-3' }, Thu: '-', Fri: { subject: 'Data Structures', room: 'A-101' } },
  ];

  // Utility to render timetable cell content
  const renderTimetableCell = (data) => {
    if (data === '-') return <center>-</center>;
    return (
      <Stack spacing={2} p={4} style={{ borderRadius: theme.radius.sm }}>
        <Text size="sm" weight={600}>{data.subject}</Text>
        <Badge size="xs" variant="light">{data.room}</Badge>
      </Stack>
    );
  };


  return (
    <Container fluid p="xl" style={{ minHeight: '100vh'}}>
      {/* Header */}
      <Group position="apart" mb="xl">
        <div>
          <Title order={1} style={{ fontWeight: 800 }}>🎓 Staff Portal</Title>
          <Text size="lg" color="dimmed">Welcome back, {staffData.name}</Text>
        </div>
        <Avatar size={70} color="blue" radius="xl" style={{ border: `3px solid ${theme.colors.blue[4]}` }}>
          <IconUserCheck size={35} />
        </Avatar>
      </Group>

      {/* Quick Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" mb="xl">
        {quickStats.map((stat, index) => (
          <StatCard key={index} {...stat} theme={theme} />
        ))}
      </SimpleGrid>

      <Grid gutter="xl">
        {/* Left Column: Profile and Events */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          {/* Staff Profile */}
          <Card shadow="md" p="xl" radius="lg" withBorder mb="xl">
            <Group mb="lg">
              <Avatar size={90} color="dark" radius="md">
                <IconSchool size={45} />
              </Avatar>
              <Stack spacing={2}>
                <Title order={3}>{staffData.name}</Title>
                <Badge 
                  color="teal" 
                  variant="light" 
                  size="lg" 
                  radius="sm" 
                  leftSection={<IconBriefcase size={14} />}
                >
                  {staffData.designation}
                </Badge>
                <Text size="sm" color="dimmed">{staffData.department}</Text>
              </Stack>
            </Group>
            <Stack spacing="xs">
              <Group position="apart">
                <Group spacing="xs">
                  <IconId size={16} color={theme.colors.blue[6]} />
                  <Text size="sm" color="dimmed">Employee ID:</Text>
                </Group>
                <Text size="sm" weight={600}>{staffData.employeeId}</Text>
              </Group>
              <Group position="apart">
                <Group spacing="xs">
                  <IconMail size={16} color={theme.colors.blue[6]} />
                  <Text size="sm" color="dimmed">Email:</Text>
                </Group>
                <Text size="sm" weight={600}>{staffData.email}</Text>
              </Group>
            </Stack>
          </Card>

          {/* Upcoming Events */}
          <Card shadow="md" p="xl" radius="lg" withBorder>
            <Title order={3} mb="md">📅 Upcoming Events</Title>
            <Timeline active={upcomingEvents.length} bulletSize={20} lineWidth={2} mt="md">
              {upcomingEvents.map((event, index) => (
                <Timeline.Item 
                  key={index} 
                  title={<Text weight={600}>{event.title}</Text>}
                  bullet={<IconChevronsRight size={12} />}
                  lineVariant="dashed"
                >
                  <Group spacing="xs">
                    <IconCalendar size={14} />
                    <Text size="sm" color="dimmed">{event.date} at {event.time}</Text>
                  </Group>
                  <Badge 
                    size="xs" 
                    mt={4}
                    variant="light"
                  >
                    {event.type}
                  </Badge>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Grid.Col>

        {/* Right Column: Tabs */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Tabs defaultValue="exams" variant="outline" radius="md" color="blue">
            <Tabs.List grow>
              <Tabs.Tab value="exams" leftSection={<IconClipboardList size={16} />}>Exam Duties</Tabs.Tab>
              <Tabs.Tab value="classes" leftSection={<IconBook size={16} />}>My Classes</Tabs.Tab>
              <Tabs.Tab value="timetable" leftSection={<IconCalendar size={16} />}>Timetable</Tabs.Tab>
            </Tabs.List>

            {/* Exam Duties Panel */}
            <Tabs.Panel value="exams" pt="md">
              <Card shadow="md" p="xl" radius="lg" withBorder>
                <Title order={3} mb="md">Exam Duty Schedule</Title>
                <Stack spacing="lg">
                  {examDuties.map((duty, index) => (
                    <Paper key={index} p="lg" radius="md" withBorder style={{ 
                      borderLeft: `5px solid ${duty.role === 'Chief Invigilator' ? theme.colors.red[6] : theme.colors.orange[4]}`
                    }}>
                      <Group position="apart" align="flex-start">
                        <Stack spacing={4}>
                          <Group spacing="xs">
                            <Badge 
                              color={
                                duty.role === 'Chief Invigilator' ? 'red' : 
                                duty.role === 'Supervisor' ? 'orange' : 'blue'
                              }
                              variant="filled"
                              radius="sm"
                            >
                              {duty.role}
                            </Badge>
                            <Badge variant="outline" color="dark">{duty.semester} Semester</Badge>
                          </Group>
                          <Text weight={700} size="xl">{duty.subject}</Text>
                          <Group spacing="md" mt="xs">
                            <Group spacing={4}>
                              <IconCalendar size={16} color={theme.colors.dark[4]} />
                              <Text size="sm">{duty.date}</Text>
                            </Group>
                            <Group spacing={4}>
                              <IconClock size={16} color={theme.colors.dark[4]} />
                              <Text size="sm">{duty.time}</Text>
                            </Group>
                          </Group>
                        </Stack>
                        <Stack spacing={4} align="flex-end">
                          <Badge 
                            color="cyan" 
                            variant="light" 
                            size="lg"
                            leftSection={<IconMapPin size={14} />}
                          >
                            {duty.venue}
                          </Badge>
                          <Group spacing={4}>
                            <IconUsers size={16} color={theme.colors.dark[4]} />
                            <Text size="sm" color="dimmed">{duty.students} students</Text>
                          </Group>
                        </Stack>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Card>
            </Tabs.Panel>

            {/* My Classes Panel */}
            <Tabs.Panel value="classes" pt="md">
              <Card shadow="md" p="xl" radius="lg" withBorder>
                <Title order={3} mb="md">My Current Classes</Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                  {classes.map((classItem, index) => (
                    <Paper key={index} p="lg" radius="md" withBorder shadow="sm">
                      <Stack spacing="md">
                        <Text weight={700} size="xl" color="blue">{classItem.subject}</Text>
                        <Group spacing="xl">
                          <Group spacing={4}>
                            <IconClock size={16} color={theme.colors.dark[6]} />
                            <Text size="sm">{classItem.time}</Text>
                          </Group>
                          <Group spacing={4}>
                            <IconMapPin size={16} color={theme.colors.dark[6]} />
                            <Text size="sm">{classItem.room}</Text>
                          </Group>
                        </Group>
                        <Stack spacing={4}>
                          <Text size="sm" weight={600} color="dimmed">
                            Avg. Attendance: <span style={{ color: theme.colors.dark[7] }}>{classItem.attendance}%</span>
                          </Text>
                          <Progress 
                            value={classItem.attendance} 
                            radius="xl"
                            size="lg"
                            color={
                              classItem.attendance > 90 ? 'teal' :
                              classItem.attendance > 80 ? 'orange' : 'red'
                            }
                            label={`${classItem.attendance}%`}
                          />
                        </Stack>
                      </Stack>
                    </Paper>
                  ))}
                </SimpleGrid>
              </Card>
            </Tabs.Panel>

            {/* Timetable Panel */}
            <Tabs.Panel value="timetable" pt="md">
              <Card shadow="md" p="xl" radius="lg" withBorder>
                <Title order={3} mb="md">Weekly Timetable</Title>
                <ScrollArea>
                    <Table verticalSpacing="sm" highlightOnHover striped minWidth={800}>
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Monday</th>
                          <th>Tuesday</th>
                          <th>Wednesday</th>
                          <th>Thursday</th>
                          <th>Friday</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TimetableData.map((row, index) => (
                          <tr key={index}>
                            <td style={{ fontWeight: 600}}>{row.time}</td>
                            <td>{renderTimetableCell(row.Mon)}</td>
                            <td>{renderTimetableCell(row.Tue)}</td>
                            <td>{renderTimetableCell(row.Wed)}</td>
                            <td>{renderTimetableCell(row.Thu)}</td>
                            <td>{renderTimetableCell(row.Fri)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                </ScrollArea>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default StaffDashboard;