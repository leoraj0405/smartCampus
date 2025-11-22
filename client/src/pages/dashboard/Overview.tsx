// src/pages/dashboard/Overview.tsx
import {
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Image,
  Stack,
  Button,
  Progress,
  Avatar,
  Paper,
  Box,
} from "@mantine/core";
import {
  IconUsers,
  IconSchool,
  IconCalendarStats,
  IconArrowRight,
  IconBuilding,
  IconWifi,
  IconBook,
  IconChartBar,
  IconTrendingUp,
  IconAlertCircle,
  IconClock,
  IconMapPin,
  IconStar,
  IconPhoto,
} from "@tabler/icons-react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import AdvancedStatCard from '../../components/ui/StatCard'

export default function Overview() {
  // Enhanced data sets
  const attendanceData = [
    { month: "Jun", value: 88, target: 90 },
    { month: "Jul", value: 90, target: 90 },
    { month: "Aug", value: 92, target: 90 },
    { month: "Sep", value: 89, target: 90 },
    { month: "Oct", value: 94, target: 90 },
    { month: "Nov", value: 91, target: 90 },
  ];

  const feeStatusData = [
    { name: "Paid", value: 78 },
    { name: "Pending", value: 15 },
    { name: "Overdue", value: 7 },
  ];

  const performanceData = [
    { subject: "Math", score: 85, avg: 72 },
    { subject: "Science", score: 78, avg: 75 },
    { subject: "English", score: 92, avg: 80 },
    { subject: "History", score: 88, avg: 78 },
    { subject: "CS", score: 95, avg: 82 },
  ];

  const resourceUsage = [
    { name: "Library", usage: 75, capacity: 100 },
    { name: "Labs", usage: 60, capacity: 80 },
    { name: "Sports", usage: 45, capacity: 90 },
    { name: "Cafeteria", usage: 85, capacity: 120 },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#e53935"];
  const HOSTEL_COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"];

  const hostels = [
    { name: "Boys Hostel A", occupancy: 85, total: 120, warden: "Dr. Sharma" },
    { name: "Girls Hostel B", occupancy: 92, total: 100, warden: "Dr. Patel" },
    { name: "PG Hostel", occupancy: 78, total: 80, warden: "Dr. Kumar" },
    { name: "International", occupancy: 65, total: 60, warden: "Dr. Lee" },
  ];

  const upcomingEvents = [
    {
      title: "Parent–Teacher Meeting",
      date: "25 Nov 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
      tag: "Important",
      type: "academic",
    },
    {
      title: "Semester Exam Schedule Release",
      date: "30 Nov 2024",
      time: "9:00 AM",
      location: "Online Portal",
      tag: "Academics",
      type: "academic",
    },
    {
      title: "Annual Cultural Fest",
      date: "15 Dec 2024",
      time: "4:00 PM",
      location: "College Ground",
      tag: "Cultural",
      type: "event",
    },
    {
      title: "Tech Symposium",
      date: "20 Dec 2024",
      time: "11:00 AM",
      location: "Tech Block",
      tag: "Technical",
      type: "event",
    },
  ];

  const announcements = [
    {
      text: "New library books added for Computer Science and AI departments.",
      time: "2 hours ago",
      priority: "info",
    },
    {
      text: "Staff meeting scheduled this Friday at 4 PM in Conference Hall.",
      time: "5 hours ago",
      priority: "normal",
    },
    {
      text: "Campus WiFi upgraded across all blocks with 5G support.",
      time: "1 day ago",
      priority: "info",
    },
    {
      text: "Hostel maintenance scheduled for this weekend. Plan accordingly.",
      time: "2 days ago",
      priority: "warning",
    },
  ];

  const campusHighlights = [
    {
      image: "/image1.jpg",
      title: "Main Campus",
      description: "State-of-the-art infrastructure",
      featured: true
    },
    {
      image: "/image2.jpeg",
      title: "Digital Library",
      description: "24/7 access to resources",
      featured: false
    },
    {
      image: "/image3.jpeg",
      title: "Sports Complex",
      description: "Olympic-standard facilities",
      featured: false
    }
  ];

  return (
    <Box style={{ padding: '0 4px' }}>
      {/* CAMPUS HIGHLIGHTS - FIRST SECTION */}
      <Card
        withBorder
        radius="lg"
        p="lg"
        mb="md"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none'
        }}
      >
        <Group position="apart" mb="md" align="center">
          <Group spacing="xs">
            <IconPhoto size={24} color="white" />
            <Text fw={700} size="xl" c="white">
              Campus Highlights
            </Text>
          </Group>
          <Badge
            variant="filled"
            color="white"
            c="blue"
            size="lg"
            leftSection={<IconStar size={14} />}
          >
            Featured
          </Badge>
        </Group>

        <Grid gutter="lg" align="stretch">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper
              radius="md"
              style={{
                overflow: 'hidden',
                height: 240,
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <Image
                src={campusHighlights[0].image}
                height={240}
                alt={campusHighlights[0].title}
                style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
              />
              <Box
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  padding: '20px',
                  color: 'white'
                }}
              >
                <Text fw={700} size="lg">{campusHighlights[0].title}</Text>
                <Text size="sm" opacity={0.9}>{campusHighlights[0].description}</Text>
              </Box>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack spacing="md" h="100%">
              {campusHighlights.slice(1).map((highlight, index) => (
                <Paper
                  key={index}
                  radius="md"
                  style={{
                    overflow: 'hidden',
                    height: 112,
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                >
                  <Image
                    src={highlight.image}
                    height={112}
                    alt={highlight.title}
                    style={{ objectFit: 'cover' }}
                  />
                  <Box
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      padding: '12px',
                      color: 'white'
                    }}
                  >
                    <Text fw={600} size="sm">{highlight.title}</Text>
                    <Text size="xs" opacity={0.9}>{highlight.description}</Text>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>

      {/* ENHANCED KPI CARDS */}
      <Grid mb="md">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <AdvancedStatCard
            title="Total Students"
            value="1,847"
            change="+12%"
            description="Active in current academic year"
            icon={<IconUsers size={20} />}
            color="blue"
            progress={85}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <AdvancedStatCard
            title="Teaching Staff"
            value="156"
            change="+5%"
            description="Faculty members"
            icon={<IconSchool size={20} />}
            color="green"
            progress={92}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <AdvancedStatCard
            title="Today Attendance"
            value="94.2%"
            change="+2.1%"
            description="Average across all classes"
            icon={<IconCalendarStats size={20} />}
            color="orange"
            progress={94}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <AdvancedStatCard
            title="Facility Usage"
            value="78%"
            change="+8%"
            description="Overall campus utilization"
            icon={<IconBuilding size={20} />}
            color="grape"
            progress={78}
          />
        </Grid.Col>
      </Grid>

      {/* MAIN CONTENT GRID */}
      <Grid>
        {/* LEFT COLUMN - CHARTS AND ANALYTICS */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Grid>

            {/* ATTENDANCE TREND - FULL WIDTH */}
            <Grid.Col span={12}>
              <Card withBorder radius="lg" p="lg" h="100%">
                <Group position="apart" mb="md">
                  <Text fw={600}>Attendance Trend</Text>
                  <IconTrendingUp size={18} color="#4caf50" />
                </Group>

                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4caf50"
                      fill="rgba(76, 175, 80, 0.1)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#ff6b6b"
                      strokeDasharray="5 5"
                      strokeWidth={1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </Grid.Col>

            {/* PERFORMANCE ANALYSIS - FULL WIDTH */}
            <Grid.Col span={12}>
              <Card withBorder radius="lg" p="lg" h="100%">
                <Group position="apart" mb="md">
                  <Text fw={600}>Performance Analysis</Text>
                  <IconChartBar size={18} color="#6366f1" />
                </Group>

                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avg" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Grid.Col>

            {/* Optional: RESOURCE USAGE FULL WIDTH */}
            {/* <Grid.Col span={12}> ... </Grid.Col> */}
          </Grid>
        </Grid.Col>


        {/* RIGHT COLUMN - SIDEBAR WIDGETS */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack>
            {/* HOSTELS OVERVIEW */}
            <Card withBorder radius="lg" p="lg">
              <Group position="apart" mb="md">
                <Text fw={600}>Hostels Overview</Text>
                <IconBuilding size={18} color="#6366f1" />
              </Group>
              <Stack spacing="md">
                {hostels.map((hostel, index) => (
                  <HostelCard
                    key={hostel.name}
                    name={hostel.name}
                    occupancy={hostel.occupancy}
                    total={hostel.total}
                    warden={hostel.warden}
                    color={HOSTEL_COLORS[index]}
                  />
                ))}
              </Stack>
              <Button
                variant="light"
                fullWidth
                mt="md"
                rightSection={<IconArrowRight size={16} />}
              >
                Manage Hostels
              </Button>
            </Card>
          </Stack>
        </Grid.Col>
        <Grid.Col>
          <Stack>
            {/* ANNOUNCEMENTS */}
            <Card withBorder radius="lg" p="lg">
              <Group position="apart" mb="md">
                <Text fw={600}>Announcements</Text>
                <IconAlertCircle size={18} color="#f59e0b" />
              </Group>
              <Stack spacing="md">
                {announcements.map((announcement, index) => (
                  <Announcement
                    key={index}
                    text={announcement.text}
                    time={announcement.time}
                    priority={announcement.priority}
                  />
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
        <Grid.Col>
          <Stack>
            {/* UPCOMING EVENTS */}
            <Card withBorder radius="lg" p="lg">
              <Group position="apart" mb="md">
                <Text fw={600}>Upcoming Events</Text>
              </Group>
              <Stack spacing="md">
                {upcomingEvents.map((event, index) => (
                  <EventItem
                    key={index}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    tag={event.tag}
                    type={event.type}
                  />
                ))}
              </Stack>
              <Button
                variant="light"
                fullWidth
                mt="md"
                rightSection={<IconArrowRight size={16} />}
              >
                View Calendar
              </Button>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

// Enhanced Event Item Component
function EventItem({ title, date, time, location, tag, type }: any) {
  const typeColors: any = {
    academic: 'blue',
    event: 'green',
    cultural: 'orange',
    technical: 'purple',
  };

  return (
    <Paper p="md" withBorder radius="md" style={{ borderLeft: `4px solid ${typeColors[type]}` }}>
      <Stack spacing="xs">
        <Group position="apart" align="flex-start">
          <Text fw={600} size="sm" style={{ flex: 1 }}>{title}</Text>
          <Badge size="sm" color={typeColors[type]}>{tag}</Badge>
        </Group>
        <Group spacing="xs">
          <IconClock size={14} />
          <Text size="xs" c="dimmed">{date} • {time}</Text>
        </Group>
        <Group spacing="xs">
          <IconMapPin size={14} />
          <Text size="xs" c="dimmed">{location}</Text>
        </Group>
      </Stack>
    </Paper>
  );
}

// Enhanced Announcement Component
function Announcement({ text, time, priority }: any) {
  const priorityColors: any = {
    info: 'blue',
    normal: 'gray',
    warning: 'orange',
    urgent: 'red',
  };

  return (
    <Group align="flex-start" spacing="sm" noWrap>
      <Avatar size={32} radius="xl" color={priorityColors[priority]}>
        <IconAlertCircle size={16} />
      </Avatar>
      <div style={{ flex: 1 }}>
        <Text size="sm" style={{ lineHeight: 1.3 }}>{text}</Text>
        <Text size="xs" c="dimmed" mt={4}>{time}</Text>
      </div>
    </Group>
  );
}

// Hostel Card Component
function HostelCard({ name, occupancy, total, warden, color }: any) {
  return (
    <Paper p="md" withBorder radius="md">
      <Group position="apart" align="flex-start" mb="xs">
        <Text fw={600} size="sm">{name}</Text>
        <Badge color={occupancy > 90 ? 'red' : occupancy > 75 ? 'yellow' : 'green'} variant="light">
          {occupancy}%
        </Badge>
      </Group>
      <Progress value={occupancy} color={color} size="md" radius="xl" mb="xs" />
      <Group position="apart">
        <Text size="xs" c="dimmed">{occupancy}/{total} students</Text>
        <Text size="xs" c="dimmed">Warden: {warden.split(' ')[1]}</Text>
      </Group>
    </Paper>
  );
}