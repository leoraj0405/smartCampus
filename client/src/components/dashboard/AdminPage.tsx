import {
    Text,
    Group,

    Paper,
    SimpleGrid,
    ThemeIcon,

    Box,

    Container,

} from '@mantine/core';
import {

    IconUser,

    IconUsers,
    IconBook,
    IconBuilding,

} from '@tabler/icons-react';

export default function AdminDashboard() {


    const statsData = [
        { title: 'Total Students', value: '2,543', icon: IconUsers, color: 'blue', change: '+12%' },
        { title: 'Total Staff', value: '342', icon: IconUser, color: 'green', change: '+5%' },
        { title: 'Active Courses', value: '48', icon: IconBook, color: 'violet', change: '+3' },
        { title: 'Campus Buildings', value: '12', icon: IconBuilding, color: 'orange', change: '0' },
    ];

    return (
        <Container size="xl">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb="xl">
                {statsData.map((stat) => (
                    <Paper key={stat.title} p="md" radius="md" withBorder>
                        <Group justify="space-between">
                            <Box>
                                <Text size="xs" c="dimmed">{stat.title}</Text>
                                <Text fw={700} size="xl">{stat.value}</Text>
                                <Text size="xs" c="green">{stat.change}</Text>
                            </Box>
                            <ThemeIcon variant="light" color={stat.color}>
                                <stat.icon size={22} />
                            </ThemeIcon>
                        </Group>
                    </Paper>
                ))}
            </SimpleGrid>
        </Container>
    );
}