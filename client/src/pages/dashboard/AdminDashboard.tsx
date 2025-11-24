import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Group,
  Select,
  Table,
  Badge,
  Progress,
  RingProgress,
  Paper,
  Image,
  Timeline,
  Button,
  Avatar,
  Stack,
  Divider,
  NumberInput,
  ActionIcon,
  Modal,
  TextInput,
  Textarea,
  useMantineTheme,
  Tabs,
  ScrollArea,
  Box,
  SimpleGrid,
  Center, // Added for centering content
  UnstyledButton, // Added for the image upload card
} from '@mantine/core';
import {
  IconUsers,
  IconBuilding,
  IconCalendarEvent,
  IconChartBar,
  IconSchool,
  IconPlus,
  IconEdit,
  IconTrash,
  IconBed,
  IconBook,
  IconClipboardList,
  IconBuildingCommunity,
  IconUserCircle,
  IconCalendarTime,
  IconChartPie,
  IconPhotoPlus, // Added for image placeholder
} from '@tabler/icons-react';

const AdminDashboard = () => {
  const theme = useMantineTheme();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [addHostelModal, setAddHostelModal] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);

  // Mock data (kept the same)
  const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Mathematics'];
  
  const campusStats = {
    totalStudents: 2450,
    totalStaff: 156,
    totalHostels: 8,
    occupancyRate: 85,
    upcomingEvents: 12
  };

  const hostelData = [
    { name: 'Boys Hostel A', capacity: 200, occupied: 180, available: 20, warden: 'Dr. Sharma', contact: '9876543210' },
    { name: 'Girls Hostel B', capacity: 150, occupied: 140, available: 10, warden: 'Dr. Patel', contact: '9876543211' },
    { name: 'Boys Hostel C', capacity: 180, occupied: 170, available: 10, warden: 'Dr. Kumar', contact: '9876543212' },
    { name: 'Girls Hostel D', capacity: 120, occupied: 110, available: 10, warden: 'Dr. Gupta', contact: '9876543213' },
  ];

  const departmentStats = [
    { department: 'Computer Science', students: 650, staff: 42, hostelOccupancy: 92, status: 'Active' },
    { department: 'Electrical Engineering', students: 580, staff: 38, hostelOccupancy: 88, status: 'Active' },
    { department: 'Mechanical Engineering', students: 720, staff: 45, hostelOccupancy: 95, status: 'High Occupancy' },
    { department: 'Civil Engineering', students: 480, staff: 28, hostelOccupancy: 82, status: 'Active' },
    { department: 'Mathematics', students: 320, staff: 23, hostelOccupancy: 78, status: 'Moderate' },
  ];

  const examDuties = [
    { staffName: 'Dr. Smith', department: 'Computer Science', examDate: '2024-04-15', time: '9:00 AM - 12:00 PM', venue: 'Block A-101', dutyType: 'Invigilator' },
    { staffName: 'Prof. Johnson', department: 'Electrical Engineering', examDate: '2024-04-16', time: '2:00 PM - 5:00 PM', venue: 'Block B-205', dutyType: 'Supervisor' },
    { staffName: 'Dr. Williams', department: 'Mechanical Engineering', examDate: '2024-04-17', time: '9:00 AM - 12:00 PM', venue: 'Block C-102', dutyType: 'Chief Invigilator' },
    { staffName: 'Prof. Brown', department: 'Civil Engineering', examDate: '2024-04-18', time: '2:00 PM - 5:00 PM', venue: 'Block D-301', dutyType: 'Invigilator' },
  ];

  const upcomingEvents = [
    { title: 'Annual Tech Fest', date: '2024-03-15', time: '10:00 AM', venue: 'Main Auditorium', organizer: 'Student Council' },
    { title: 'Research Symposium', date: '2024-03-20', time: '2:00 PM', venue: 'Conference Hall', organizer: 'Research Dept' },
    { title: 'Sports Meet', date: '2024-03-25', time: '9:00 AM', venue: 'Sports Ground', organizer: 'Sports Committee' },
    { title: 'Cultural Night', date: '2024-04-01', time: '6:00 PM', venue: 'Open Air Theater', organizer: 'Cultural Club' },
  ];

  const statsCards = [
    { title: 'Total Students', value: '2,450', icon: IconUsers, color: 'blue', description: 'Across all departments' },
    { title: 'Teaching Staff', value: '156', icon: IconUserCircle, color: 'green', description: 'Faculty members' },
    { title: 'Hostel Capacity', value: '8', icon: IconBuilding, color: 'orange', description: 'Total hostels' },
    { title: 'Occupancy Rate', value: '85%', icon: IconChartPie, color: 'red', description: 'Overall occupancy' },
  ];

  // Component for a single Stat Card (with improved style)
  const StatCard = ({ title, value, icon: Icon, color, description }) => (
    <Card shadow="md" p="xl" radius="lg" withBorder>
      <Group position="apart">
        <Stack spacing={4}>
          <Text size="xs" color="dimmed" transform="uppercase" weight={700}>
            {title}
          </Text>
          <Title order={2} style={{ color: theme.colors[color][6] }}>
            {value}
          </Title>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </Stack>
        <Avatar size={60} color={color} variant="light">
          <Icon size={30} style={{ color: theme.colors[color][6] }} />
        </Avatar>
      </Group>
    </Card>
  );

  // Component for the Image Upload Placeholder
  const ImageUploadPlaceholder = () => (
    <UnstyledButton 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: 180, // Ensure a minimum height
      }}
    >
      <Paper 
        shadow="md" 
        p="xl" 
        radius="lg" 
        withBorder 
        style={{ 
          border: `2px dashed ${theme.colors.gray[4]}`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Center>
          <IconPhotoPlus size={40} style={{ color: theme.colors.gray[6] }} />
        </Center>
        <Text size="sm" color="dimmed" mt="xs" align="center" weight={500}>
          Upload Campus Image 3
        </Text>
        <Text size="xs" color="dimmed" align="center">
          Click to select file
        </Text>
      </Paper>
    </UnstyledButton>
  );

  // Component for displaying a Campus Image
  const CampusImageCard = ({ title, imageSrc }) => (
    <Card shadow="md" p={0} radius="lg" withBorder>
      <Image
        src={imageSrc}
        height={180}
        alt={title}
        fit="cover"
        radius="lg"
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      />
      <Box p="md">
        <Title order={4} size="sm">{title}</Title>
        <Text size="xs" color="dimmed">Main administrative block view</Text>
      </Box>
    </Card>
  );


  return (
    <Container fluid p="xl" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Group position="apart" mb="xl">
        <div>
          <Title order={1} style={{ fontWeight: 800 }}>🏛️ Campus Administration</Title>
          <Text size="lg" color="dimmed">Comprehensive management dashboard for institutional oversight</Text>
        </div>
        <Group spacing="md">
          <Select
            placeholder="Select Department"
            data={[
              { value: 'all', label: 'All Departments' },
              ...departments.map(dept => ({ value: dept, label: dept }))
            ]}
            value={selectedDepartment}
            onChange={setSelectedDepartment}
            style={{ width: 250 }}
            radius="md"
          />
          <Button leftSection={<IconPlus size={16} />} color="dark" radius="md">
            Add New Item
          </Button>
        </Group>
      </Group>
      
      <Divider mb="xl" />

      {/* Statistics Overview (Using SimpleGrid for better responsiveness and card display) */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl" mb="xl">
        {statsCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
        {/* Added two campus image cards and one placeholder */}
        <CampusImageCard 
            title="Campus Image 1" 
            imageSrc="https://images.unsplash.com/photo-1541339907198-e0875662f976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        />
        <CampusImageCard 
            title="Campus Image 2" 
            imageSrc="https://images.unsplash.com/photo-1628126068212-88151241193a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        />
        <ImageUploadPlaceholder />
      </SimpleGrid>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" variant="pills" radius="md">
        <Tabs.List grow mb="xl">
          <Tabs.Tab value="overview" leftSection={<IconChartBar size={16} />}>Overview</Tabs.Tab>
          <Tabs.Tab value="hostels" leftSection={<IconBuilding size={16} />}>Hostel Management</Tabs.Tab>
          <Tabs.Tab value="exams" leftSection={<IconClipboardList size={16} />}>Exam Allocation</Tabs.Tab>
          <Tabs.Tab value="departments" leftSection={<IconSchool size={16} />}>Department Data</Tabs.Tab>
        </Tabs.List>

        {/* Overview Panel */}
        <Tabs.Panel value="overview" pt="md">
          <Grid gutter="xl">
            <Grid.Col xs={12} md={6}>
              <Card shadow="md" p="xl" radius="lg" withBorder style={{ height: '100%' }}>
                <Group position="apart" mb="xl">
                  <Title order={3}>🛏️ Hostel Occupancy</Title>
                  <Button 
                    leftSection={<IconPlus size={16} />} 
                    size="sm"
                    variant="light"
                    onClick={() => setAddHostelModal(true)}
                  >
                    Add Hostel
                  </Button>
                </Group>
                <ScrollArea h={350}>
                  <Stack spacing="md">
                    {hostelData.map((hostel, index) => (
                      <Paper key={index} p="md" radius="md" withBorder>
                        <Group position="apart">
                          <div>
                            <Text weight={600}>{hostel.name}</Text>
                            <Text size="sm" color="dimmed">Warden: {hostel.warden}</Text>
                          </div>
                          <Stack spacing={4} align="flex-end" style={{ width: 150 }}>
                            <Text size="sm">{hostel.occupied}/{hostel.capacity} beds</Text>
                            <Progress 
                              value={(hostel.occupied / hostel.capacity) * 100} 
                              size="xl" 
                              radius="xl"
                              color={hostel.available < 15 ? 'red' : 'teal'}
                            />
                          </Stack>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </ScrollArea>
              </Card>
            </Grid.Col>

            <Grid.Col xs={12} md={6}>
              <Card shadow="md" p="xl" radius="lg" withBorder style={{ height: '100%' }}>
                <Group position="apart" mb="xl">
                  <Title order={3}>🗓️ Upcoming Events</Title>
                  <Button 
                    leftSection={<IconPlus size={16} />} 
                    size="sm"
                    variant="light"
                    onClick={() => setAddEventModal(true)}
                  >
                    Add Event
                  </Button>
                </Group>
                <ScrollArea h={350}>
                  <Timeline active={upcomingEvents.length} bulletSize={24} lineWidth={2} mt="md">
                    {upcomingEvents.map((event, index) => (
                      <Timeline.Item 
                        key={index} 
                        title={<Text weight={600}>{event.title}</Text>}
                        bullet={<IconCalendarTime size={14} />}
                        lineVariant="dashed"
                      >
                        <Text size="sm" color="blue">{event.date} at {event.time}</Text>
                        <Text size="xs" color="dimmed">Venue: {event.venue}</Text>
                        <Text size="xs" color="gray">Organizer: <Badge size="xs" variant="light">{event.organizer}</Badge></Text>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </ScrollArea>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* Hostel Management Panel */}
        <Tabs.Panel value="hostels" pt="md">
          <Card shadow="md" p="xl" radius="lg" withBorder>
            <Title order={3} mb="md">Hostel Details</Title>
            <ScrollArea>
              <Table striped highlightOnHover verticalSpacing="md" fontSize="sm">
                <thead>
                  <tr>
                    <th>Hostel Name</th>
                    <th>Capacity</th>
                    <th>Occupied</th>
                    <th>Available</th>
                    <th>Occupancy</th>
                    <th>Warden</th>
                    <th>Contact</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hostelData.map((hostel, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 600 }}>{hostel.name}</td>
                      <td>{hostel.capacity}</td>
                      <td>{hostel.occupied}</td>
                      <td>
                        <Badge 
                          color={hostel.available < 15 ? 'red' : 'green'} 
                          variant="light"
                          radius="sm"
                        >
                          {hostel.available}
                        </Badge>
                      </td>
                      <td>
                        <RingProgress
                          size={60}
                          thickness={6}
                          sections={[
                            { 
                              value: (hostel.occupied / hostel.capacity) * 100, 
                              color: (hostel.occupied / hostel.capacity) * 100 > 90 ? 'red' : 'blue' 
                            }
                          ]}
                          label={
                            <Text size="xs" weight={700} align="center">
                              {Math.round((hostel.occupied / hostel.capacity) * 100)}%
                            </Text>
                          }
                        />
                      </td>
                      <td>{hostel.warden}</td>
                      <td>{hostel.contact}</td>
                      <td>
                        <Group spacing="xs">
                          <ActionIcon color="blue" variant="light" size="lg" radius="md">
                            <IconEdit size={18} />
                          </ActionIcon>
                          <ActionIcon color="red" variant="light" size="lg" radius="md">
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Group>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ScrollArea>
          </Card>
        </Tabs.Panel>

        {/* Exam Allocation Panel (Simplified for brevity, assuming similar styling) */}
        <Tabs.Panel value="exams" pt="md">
           <Card shadow="md" p="xl" radius="lg" withBorder>
            <Title order={3} mb="md">Exam Duty Allocation</Title>
            <ScrollArea>
              <Table striped highlightOnHover verticalSpacing="md" fontSize="sm">
                <thead>
                  <tr>
                    <th>Staff Name</th>
                    <th>Department</th>
                    <th>Exam Date</th>
                    <th>Time</th>
                    <th>Venue</th>
                    <th>Duty Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {examDuties.map((duty, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 600 }}>{duty.staffName}</td>
                      <td>{duty.department}</td>
                      <td>{duty.examDate}</td>
                      <td>{duty.time}</td>
                      <td>{duty.venue}</td>
                      <td>
                        <Badge color={
                          duty.dutyType === 'Chief Invigilator' ? 'red' : 
                          duty.dutyType === 'Supervisor' ? 'orange' : 'blue'
                        } variant="filled" radius="sm">
                          {duty.dutyType}
                        </Badge>
                      </td>
                      <td>
                        <Group spacing="xs">
                          <ActionIcon color="blue" variant="light" size="lg" radius="md">
                            <IconEdit size={18} />
                          </ActionIcon>
                          <ActionIcon color="red" variant="light" size="lg" radius="md">
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Group>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ScrollArea>
          </Card>
        </Tabs.Panel>

        {/* Department Data Panel (Simplified for brevity, assuming similar styling) */}
        <Tabs.Panel value="departments" pt="md">
          <Card shadow="md" p="xl" radius="lg" withBorder>
            <Title order={3} mb="md">Department-wise Statistics</Title>
            <ScrollArea>
              <Table highlightOnHover verticalSpacing="md">
                <Table.Thead>
                  <tr>
                    <th>Department</th>
                    <th>Students</th>
                    <th>Staff</th>
                    <th>Hostel Occupancy</th>
                    <th>Status</th>
                    <th>Progress</th>
                  </tr>
                </Table.Thead>
                <tbody>
                  {departmentStats.map((dept, index) => (
                    <tr key={index}>
                      <td>
                        <Group>
                          <Avatar size="md" color="blue" variant="light" radius="md">
                            <IconSchool size={20} />
                          </Avatar>
                          <Text weight={600}>{dept.department}</Text>
                        </Group>
                      </td>
                      <td>{dept.students}</td>
                      <td>{dept.staff}</td>
                      <td><Badge variant="filled">{dept.hostelOccupancy}%</Badge></td>
                      <td>
                        <Badge color={
                          dept.status === 'Active' ? 'teal' :
                          dept.status === 'High Occupancy' ? 'red' : 'yellow'
                        } variant="dot">
                          {dept.status}
                        </Badge>
                      </td>
                      <td style={{ width: 250 }}>
                        <Progress 
                          value={dept.hostelOccupancy} 
                          color={dept.hostelOccupancy > 90 ? 'red' : 'blue'}
                          size="xl"
                          radius="xl"
                          label={`${dept.hostelOccupancy}%`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ScrollArea>
          </Card>
        </Tabs.Panel>
      </Tabs>

      {/* Add Hostel Modal (Styling buttons/inputs) */}
      <Modal
        opened={addHostelModal}
        onClose={() => setAddHostelModal(false)}
        title={<Title order={3}>Add New Hostel</Title>}
        size="lg"
        centered
        overlayProps={{ blur: 3 }}
      >
        <Stack spacing="md">
          <TextInput label="Hostel Name" placeholder="Enter hostel name" radius="md" />
          <Select
            label="Hostel Type"
            data={[
              { value: 'boys', label: 'Boys Hostel' },
              { value: 'girls', label: 'Girls Hostel' }
            ]}
            radius="md"
          />
          <NumberInput label="Capacity" placeholder="Total beds" min={1} radius="md" />
          <TextInput label="Warden Name" placeholder="Enter warden name" radius="md" />
          <TextInput label="Contact Number" placeholder="Enter contact number" radius="md" />
          <Group position="right" mt="lg">
            <Button variant="outline" onClick={() => setAddHostelModal(false)} radius="md">Cancel</Button>
            <Button radius="md" leftSection={<IconPlus size={16} />}>Add Hostel</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Add Event Modal (Styling buttons/inputs) */}
      <Modal
        opened={addEventModal}
        onClose={() => setAddEventModal(false)}
        title={<Title order={3}>Add New Event</Title>}
        size="lg"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Stack spacing="md">
          <TextInput label="Event Title" placeholder="Enter event title" radius="md" />
          <Grid>
            <Grid.Col span={6}><TextInput label="Date" type="date" radius="md" /></Grid.Col>
            <Grid.Col span={6}><TextInput label="Time" type="time" radius="md" /></Grid.Col>
          </Grid>
          <TextInput label="Venue" placeholder="Enter venue" radius="md" />
          <TextInput label="Organizer" placeholder="Enter organizer name" radius="md" />
          <Textarea label="Description" placeholder="Enter event description" minRows={3} radius="md" />
          <Group position="right" mt="lg">
            <Button variant="outline" onClick={() => setAddEventModal(false)} radius="md">Cancel</Button>
            <Button radius="md" leftSection={<IconPlus size={16} />}>Add Event</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;