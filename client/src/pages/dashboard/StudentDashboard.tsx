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
  SimpleGrid,
  useMantineTheme,
  Box,
  ActionIcon,
  RingProgress,
  Center,
  Divider,
  Button,
  ScrollArea,
  Pagination
} from '@mantine/core';
import {
  IconCalendar,
  IconClock,
  IconBook,
  IconSchool,
  IconClipboardList,
  IconMapPin,
  IconUser,
  IconBell,
  IconChartBar,
  IconCalendarEvent,
  IconDownload,
  IconShare,
  IconStar,
  IconEye,
  IconRefresh,
  IconSettings
} from '@tabler/icons-react';

const StudentDashboard = () => {
  const theme = useMantineTheme();

  const studentData = {
    name: 'John Doe',
    department: 'Computer Science',
    semester: 3,
    rollNumber: 'CS2023001',
    email: 'john.doe@student.edu',
    hostel: 'Boys Hostel A',
    room: 'A-301',
    cgpa: 8.75,
    attendance: 91
  };

  const timetable = [
    { day: 'Monday', time: '9:00-10:00', subject: 'Data Structures', room: 'A-101', faculty: 'Dr. Smith', type: 'Lecture' },
    { day: 'Monday', time: '10:00-11:00', subject: 'Mathematics', room: 'B-102', faculty: 'Prof. Johnson', type: 'Tutorial' },
    { day: 'Tuesday', time: '9:00-10:00', subject: 'Algorithms', room: 'A-102', faculty: 'Dr. Williams', type: 'Lecture' },
    { day: 'Wednesday', time: '2:00-3:00', subject: 'Database Systems', room: 'Lab-3', faculty: 'Dr. Brown', type: 'Lab' },
    { day: 'Thursday', time: '11:00-12:00', subject: 'Operating Systems', room: 'B-201', faculty: 'Prof. Davis', type: 'Lecture' },
  ];

  const upcomingExams = [
    { 
      subject: 'Data Structures', 
      date: '2024-04-15', 
      time: '9:00 AM', 
      venue: 'Hall A', 
      type: 'Theory', 
      duration: '3 hours',
      preparation: 75,
      importance: 'high'
    },
    { 
      subject: 'Algorithms', 
      date: '2024-04-18', 
      time: '2:00 PM', 
      venue: 'Hall B', 
      type: 'Theory', 
      duration: '3 hours',
      preparation: 60,
      importance: 'high'
    },
    { 
      subject: 'Database Systems', 
      date: '2024-04-22', 
      time: '9:00 AM', 
      venue: 'Lab Complex', 
      type: 'Practical', 
      duration: '2 hours',
      preparation: 85,
      importance: 'medium'
    },
  ];

  const announcements = [
    { 
      title: 'Festival Holiday', 
      date: '2024-03-20', 
      content: 'College will remain closed for Holi festival on March 20th. All classes and examinations scheduled for this date will be rescheduled.', 
      urgency: 'info',
      author: 'Registrar Office',
      read: true
    },
    { 
      title: 'Exam Schedule Released', 
      date: '2024-03-25', 
      content: 'Final examination schedule for even semester has been released. Please check your student portal for detailed timetable and venue information.', 
      urgency: 'important',
      author: 'Examination Cell',
      read: false
    },
    { 
      title: 'Hostel Maintenance', 
      date: '2024-03-28', 
      content: 'Scheduled maintenance in Hostel A from 2 PM to 5 PM. Water supply will be temporarily unavailable during this period.', 
      urgency: 'warning',
      author: 'Hostel Management',
      read: true
    },
  ];

  const attendance = [
    { subject: 'Data Structures', attended: 28, total: 30, percentage: 93, trend: 'up' },
    { subject: 'Algorithms', attended: 25, total: 30, percentage: 83, trend: 'down' },
    { subject: 'Database Systems', attended: 29, total: 30, percentage: 97, trend: 'up' },
    { subject: 'Operating Systems', attended: 27, total: 30, percentage: 90, trend: 'stable' },
    { subject: 'Mathematics', attended: 26, total: 30, percentage: 87, trend: 'up' },
    { subject: 'Web Technologies', attended: 24, total: 30, percentage: 80, trend: 'down' },
  ];

  const quickStats = [
    { 
      label: 'Current Semester', 
      value: '3rd', 
      color: 'blue',
      icon: IconSchool,
      description: 'Even Semester 2024'
    },
    { 
      label: 'CGPA', 
      value: '8.75', 
      color: 'green',
      icon: IconStar,
      description: 'Out of 10.0'
    },
    { 
      label: 'Attendance', 
      value: '91%', 
      color: 'orange',
      icon: IconChartBar,
      description: 'Overall'
    },
    { 
      label: 'Upcoming Exams', 
      value: '3', 
      color: 'red',
      icon: IconClipboardList,
      description: 'This month'
    },
  ];

  const todayClasses = timetable.filter(cls => cls.day === 'Monday');

  // Get current time for highlighting current class
  const currentTime = '09:30'; // Mock current time

  const getSubjectTypeColor = (type) => {
    switch (type) {
      case 'Lecture': return 'blue';
      case 'Lab': return 'green';
      case 'Tutorial': return 'orange';
      default: return 'gray';
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Container fluid p="md" style={{ 
      minHeight: '100vh',
    }}>
      {/* Header */}
      <Card 
        shadow="lg" 
        p="lg" 
        radius="lg" 
        mb="xl"
        style={{
          color: 'white'
        }}
      >
        <Group position="apart">
          <div>
            <Title order={1} style={{ color: 'white', marginBottom: theme.spacing.xs }}>
              Student Portal
            </Title>
            <Text size="lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Welcome back, {studentData.name}! 👋
            </Text>
            <Text size="sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Here's your academic overview for today
            </Text>
          </div>
          <Group>
            <ActionIcon variant="filled" color="white" size="lg" radius="xl">
              <IconRefresh size={20} style={{ color: theme.colors.blue[6] }} />
            </ActionIcon>
            <ActionIcon variant="filled" color="white" size="lg" radius="xl">
              <IconSettings size={20} style={{ color: theme.colors.blue[6] }} />
            </ActionIcon>
            <Avatar 
              size={60} 
              color="white" 
              radius="xl"
              style={{
                border: `3px solid ${theme.colors.blue[3]}`,
              }}
            >
              <IconUser size={30} style={{ color: 'white' }} />
            </Avatar>
          </Group>
        </Group>
      </Card>

      {/* Quick Stats */}
      <Grid mb="xl" gutter="lg">
        {quickStats.map((stat, index) => (
          <Grid.Col key={index} xs={6} sm={3}>
            <Card 
              shadow="md" 
              p="lg" 
              radius="lg" 
              withBorder
              style={{
                borderLeft: `4px solid ${theme.colors[stat.color][6]}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              sx={{
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows.lg
                }
              }}
            >
              <Group position="apart" noWrap>
                <div style={{ flex: 1 }}>
                  <Text size="sm" color="dimmed" weight={600} transform="uppercase">
                    {stat.label}
                  </Text>
                  <Title order={2} style={{ color: theme.colors[stat.color][6] }} mt={4}>
                    {stat.value}
                  </Title>
                  <Text size="xs" color="dimmed" mt={2}>
                    {stat.description}
                  </Text>
                </div>
                <Center>
                  <stat.icon size={32} color={theme.colors[stat.color][5]} />
                </Center>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Grid gutter="xl">
        {/* Left Sidebar */}
        <Grid.Col xs={12} md={4}>
          {/* Student Profile */}
          <Card 
            shadow="md" 
            p="lg" 
            radius="lg" 
            withBorder
            mb="md"
          >
            <Group position="apart" mb="md">
              <Title order={3}>Student Profile</Title>
              <ActionIcon>
                <IconEye size={18} />
              </ActionIcon>
            </Group>
            
            <Group align="flex-start" mb="lg">
              <Avatar 
                size={80} 
                radius="lg"
              >
                <IconSchool size={40} style={{ color: 'white' }} />
              </Avatar>
              <div style={{ flex: 1 }}>
                <Title order={4}>{studentData.name}</Title>
                <Badge color="blue" variant="light" size="sm">
                  {studentData.department}
                </Badge>
                <Text size="sm" color="dimmed" mt={4}>
                  Semester {studentData.semester}
                </Text>
              </div>
            </Group>

            <Stack spacing="sm">
              <Group position="apart">
                <Text size="sm" color="dimmed">Roll Number</Text>
                <Text size="sm" weight={600}>{studentData.rollNumber}</Text>
              </Group>
              <Group position="apart">
                <Text size="sm" color="dimmed">Email</Text>
                <Text size="sm" weight={600}>{studentData.email}</Text>
              </Group>
              <Group position="apart">
                <Text size="sm" color="dimmed">Hostel & Room</Text>
                <Badge color="green" variant="light">
                  {studentData.hostel} • {studentData.room}
                </Badge>
              </Group>
            </Stack>

            <Divider my="md" />

            <SimpleGrid cols={2} spacing="sm">
              <div style={{ textAlign: 'center' }}>
                <RingProgress
                  size={80}
                  thickness={6}
                  sections={[{ value: studentData.attendance, color: 'green' }]}
                  label={
                    <Text size="xs" align="center">
                      {studentData.attendance}%
                    </Text>
                  }
                />
                <Text size="sm" color="dimmed" mt={4}>Attendance</Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <RingProgress
                  size={80}
                  thickness={6}
                  sections={[{ value: studentData.cgpa * 10, color: 'blue' }]}
                  label={
                    <Text size="xs" align="center">
                      {studentData.cgpa}
                    </Text>
                  }
                />
                <Text size="sm" color="dimmed" mt={4}>CGPA</Text>
              </div>
            </SimpleGrid>
          </Card>

          {/* Today's Classes */}
          <Card shadow="md" p="lg" radius="lg" withBorder>
            <Group position="apart" mb="md">
              <Title order={3}>
                <Group spacing="xs">
                  <IconCalendarEvent />
                  <Text>Today's Classes</Text>
                </Group>
              </Title>
              <Badge variant="filled" color="blue">
                Monday
              </Badge>
            </Group>
            
            <Stack spacing="md">
              {todayClasses.map((cls, index) => {
                const isCurrent = cls.time.includes('9:00'); // Mock current class check
                return (
                  <Paper 
                    key={index} 
                    p="md" 
                    withBorder
                    style={{
                      borderLeft: `4px solid ${theme.colors[getSubjectTypeColor(cls.type)][6]}`,
                      transition: 'all 0.2s ease'
                    }}
                    sx={{
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: theme.shadows.sm
                      }
                    }}
                  >
                    <Group position="apart" align="flex-start">
                      <div style={{ flex: 1 }}>
                        <Group spacing="xs" mb={4}>
                          <Text weight={600} size="md">{cls.subject}</Text>
                          <Badge size="sm" color={getSubjectTypeColor(cls.type)}>
                            {cls.type}
                          </Badge>
                          {isCurrent && (
                            <Badge size="sm" color="green" variant="filled">
                              Now
                            </Badge>
                          )}
                        </Group>
                        <Group spacing="lg">
                          <Group spacing="xs">
                            <IconClock size={14} color={theme.colors.gray[6]} />
                            <Text size="sm">{cls.time}</Text>
                          </Group>
                          <Group spacing="xs">
                            <IconMapPin size={14} color={theme.colors.gray[6]} />
                            <Text size="sm">{cls.room}</Text>
                          </Group>
                        </Group>
                        <Text size="sm" color="dimmed" mt={4}>
                          Faculty: {cls.faculty}
                        </Text>
                      </div>
                    </Group>
                  </Paper>
                );
              })}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Main Content */}
        <Grid.Col xs={12} md={8}>
          <Tabs 
            defaultValue="timetable" 
            variant="pills"
            styles={{
              tabsList: {
                padding: theme.spacing.sm,
                borderRadius: theme.radius.lg
              }
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="timetable" rightSection={<IconCalendar size={16} />}>
                Timetable
              </Tabs.Tab>
              <Tabs.Tab value="exams" rightSection={<IconClipboardList size={16} />}>
                Exams
              </Tabs.Tab>
              <Tabs.Tab value="attendance" rightSection={<IconChartBar size={16} />}>
                Attendance
              </Tabs.Tab>
              <Tabs.Tab value="announcements" rightSection={<IconBell size={16} />}>
                Announcements
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="timetable" pt="md">
              <Card shadow="md" p="lg" radius="lg" withBorder>
                <Group position="apart" mb="md">
                  <Title order={3}>Weekly Timetable</Title>
                  <Group>
                    <Button variant="light" size="sm" leftSection={<IconDownload size={16} />}>
                      Export
                    </Button>
                    <Button variant="light" size="sm" leftSection={<IconShare size={16} />}>
                      Share
                    </Button>
                  </Group>
                </Group>
                
                <ScrollArea>
                  <Table 
                    striped 
                    highlightOnHover
                    style={{ minWidth: 800 }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: '120px' }}>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['9:00-10:00', '10:00-11:00', '11:00-12:00', '2:00-3:00', '3:00-4:00'].map((timeSlot, index) => (
                        <tr key={index}>
                          <td style={{ fontWeight: 600 }}>{timeSlot}</td>
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
                            const classInfo = timetable.find(cls => cls.day === day && cls.time === timeSlot);
                            return (
                              <td key={day}>
                                {classInfo ? (
                                  <Box>
                                    <Group spacing="xs" mb={4}>
                                      <Text weight={600} size="sm">{classInfo.subject}</Text>
                                      <Badge 
                                        size="xs" 
                                        color={getSubjectTypeColor(classInfo.type)}
                                        variant="light"
                                      >
                                        {classInfo.type}
                                      </Badge>
                                    </Group>
                                    <Text size="xs" color="dimmed">
                                      {classInfo.room} • {classInfo.faculty}
                                    </Text>
                                  </Box>
                                ) : (
                                  <Text size="sm" color="dimmed" style={{ fontStyle: 'italic' }}>
                                    No class
                                  </Text>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ScrollArea>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="exams" pt="md">
              <Card shadow="md" p="lg" radius="lg" withBorder>
                <Group position="apart" mb="md">
                  <Title order={3}>Upcoming Exams</Title>
                  <Text size="sm" color="dimmed">
                    {upcomingExams.length} exams scheduled
                  </Text>
                </Group>
                
                <SimpleGrid cols={1} spacing="md">
                  {upcomingExams.map((exam, index) => (
                    <Paper 
                      key={index} 
                      p="lg" 
                      withBorder
                      style={{
                        borderLeft: `4px solid ${theme.colors[getImportanceColor(exam.importance)][6]}`,
                      }}
                    >
                      <Group position="apart" align="flex-start">
                        <div style={{ flex: 1 }}>
                          <Group spacing="xs" mb="xs">
                            <Badge 
                              color={exam.type === 'Theory' ? 'blue' : 'green'}
                              variant="filled"
                            >
                              {exam.type}
                            </Badge>
                            <Badge variant="outline">{exam.duration}</Badge>
                            <Badge 
                              color={getImportanceColor(exam.importance)}
                              variant="light"
                            >
                              {exam.importance} priority
                            </Badge>
                          </Group>
                          
                          <Title order={4} mb="xs">{exam.subject}</Title>
                          
                          <Group spacing="lg">
                            <Group spacing="xs">
                              <IconCalendar size={16} color={theme.colors.gray[6]} />
                              <Text size="sm" weight={500}>{exam.date}</Text>
                            </Group>
                            <Group spacing="xs">
                              <IconClock size={16} color={theme.colors.gray[6]} />
                              <Text size="sm" weight={500}>{exam.time}</Text>
                            </Group>
                            <Group spacing="xs">
                              <IconMapPin size={16} color={theme.colors.gray[6]} />
                              <Text size="sm" weight={500}>{exam.venue}</Text>
                            </Group>
                          </Group>

                          <Box mt="md">
                            <Group position="apart" mb="xs">
                              <Text size="sm" color="dimmed">Preparation Progress</Text>
                              <Text size="sm" weight={600}>{exam.preparation}%</Text>
                            </Group>
                            <Progress 
                              value={exam.preparation} 
                              color={
                                exam.preparation >= 80 ? 'green' :
                                exam.preparation >= 60 ? 'yellow' : 'red'
                              }
                              size="lg"
                              radius="xl"
                            />
                          </Box>
                        </div>
                      </Group>
                    </Paper>
                  ))}
                </SimpleGrid>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="attendance" pt="md">
              <Card shadow="md" p="lg" radius="lg" withBorder>
                <Group position="apart" mb="md">
                  <Title order={3}>Attendance Summary</Title>
                  <Badge 
                    color={studentData.attendance >= 75 ? 'green' : 'red'} 
                    variant="filled" 
                    size="lg"
                  >
                    Overall: {studentData.attendance}%
                  </Badge>
                </Group>
                
                <Stack spacing="md">
                  {attendance.map((item, index) => (
                    <Paper key={index} p="lg" withBorder>
                      <Group position="apart">
                        <div style={{ flex: 1 }}>
                          <Group position="apart" mb="xs">
                            <Text weight={600} size="lg">{item.subject}</Text>
                            <Group spacing="xs">
                              <Badge 
                                color={
                                  item.percentage >= 90 ? 'green' :
                                  item.percentage >= 75 ? 'yellow' : 'red'
                                }
                                variant="light"
                              >
                                {item.percentage >= 90 ? 'Excellent' :
                                 item.percentage >= 75 ? 'Good' : 'Needs Improvement'}
                              </Badge>
                              <Badge 
                                color={item.trend === 'up' ? 'green' : item.trend === 'down' ? 'red' : 'yellow'}
                                variant="outline"
                              >
                                {item.trend === 'up' ? '↑ Improving' : 
                                 item.trend === 'down' ? '↓ Declining' : '→ Stable'}
                              </Badge>
                            </Group>
                          </Group>
                          
                          <Text size="sm" color="dimmed" mb="md">
                            {item.attended} out of {item.total} classes attended
                          </Text>
                          
                          <Group position="apart" align="flex-end">
                            <div style={{ flex: 1, maxWidth: 400 }}>
                              <Progress 
                                value={item.percentage} 
                                color={
                                  item.percentage >= 90 ? 'green' :
                                  item.percentage >= 75 ? 'yellow' : 'red'
                                }
                                size="xl"
                                radius="xl"
                                styles={{
                                  root: {
                                    height: 12
                                  }
                                }}
                              />
                            </div>
                            <Text size="lg" weight={700} style={{ color: theme.colors.blue[6] }}>
                              {item.percentage}%
                            </Text>
                          </Group>
                        </div>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="announcements" pt="md">
              <Card shadow="md" p="lg" radius="lg" withBorder>
                <Group position="apart" mb="md">
                  <Title order={3}>Announcements</Title>
                  <Text size="sm" color="dimmed">
                    {announcements.filter(a => !a.read).length} unread
                  </Text>
                </Group>
                
                <Stack spacing="md">
                  {announcements.map((announcement, index) => (
                    <Paper 
                      key={index} 
                      p="lg" 
                      withBorder
                      style={{
                        borderLeft: `4px solid ${
                          announcement.urgency === 'important' ? theme.colors.red[6] :
                          announcement.urgency === 'warning' ? theme.colors.orange[6] : theme.colors.blue[6]
                        }`,
                        opacity: announcement.read ? 0.8 : 1,
                      }}
                      sx={{
                        '&:hover': {
                          transform: 'translateX(4px)',
                          boxShadow: theme.shadows.md
                        }
                      }}
                    >
                      <Group position="apart" align="flex-start" mb="xs">
                        <div style={{ flex: 1 }}>
                          <Group spacing="xs" mb={4}>
                            <Text weight={600} size="lg">{announcement.title}</Text>
                            {!announcement.read && (
                              <Badge color="red" size="sm" variant="filled">
                                New
                              </Badge>
                            )}
                          </Group>
                          <Group spacing="lg">
                            <Text size="sm" color="dimmed">
                              {announcement.date}
                            </Text>
                            <Text size="sm" color="blue">
                              By {announcement.author}
                            </Text>
                          </Group>
                        </div>
                        <Badge 
                          color={
                            announcement.urgency === 'important' ? 'red' :
                            announcement.urgency === 'warning' ? 'orange' : 'blue'
                          }
                          variant="light"
                        >
                          {announcement.urgency}
                        </Badge>
                      </Group>
                      <Text size="sm" style={{ lineHeight: 1.6 }}>
                        {announcement.content}
                      </Text>
                    </Paper>
                  ))}
                </Stack>
                
                <Center mt="xl">
                  <Pagination total={3} size="sm" />
                </Center>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;