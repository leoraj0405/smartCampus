import { ActionIcon, Box, Divider, Group, Image, NavLink, rem, ScrollArea, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconCalendar, IconChartBar, IconChevronLeft, IconChevronRight, IconDashboard, IconFileAnalytics, IconHelp, IconHome, IconMail, IconSettings, IconUsers } from "@tabler/icons-react";
import type { ILayoutProps, NavItem } from "../types/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navData: NavItem[] = [
    { label: 'Dashboard', icon: <IconHome size={18} />, href: '/admin' },
    { label: 'Analytics', icon: <IconChartBar size={18} />, href: '/staff' },
    { label: 'Users', icon: <IconUsers size={18} />, href: '/users' },
    { label: 'Projects', icon: <IconDashboard size={18} />, href: '/projects' },
    { label: 'Reports', icon: <IconFileAnalytics size={18} />, href: '/reports' },
    { label: 'Calendar', icon: <IconCalendar size={18} />, href: '/calendar' },
    { label: 'Messages', icon: <IconMail size={18} />, href: '/messages' },
    { label: 'Settings', icon: <IconSettings size={18} />, href: '/settings' },
    { label: 'Help Center', icon: <IconHelp size={18} />, href: '/help' },
];


const Sidebar = (props: ILayoutProps) => {
    const [active, setActive] = useState('Dashboard');
    const theme = useMantineTheme();
    const { sidebarOpened, sidebar, isMobile, mobile } = props;
    const navigate = useNavigate()
    const changeurl = (url: string) => {
        navigate(url)
    }

    return (
        <>
            <Group justify={sidebarOpened ? 'space-between' : 'center'} mb="xl">
                {sidebarOpened ? (
                    <>
                        <Group gap="sm">
                            <Box>
                                <Image
                                    src={`/logo.png`}
                                    w={80}
                                    h={70}
                                />
                            </Box>
                        </Group>
                        {!isMobile && (
                            <ActionIcon onClick={sidebar.toggle} variant="subtle">
                                <IconChevronLeft size={18} />
                            </ActionIcon>
                        )}
                    </>
                ) : (
                    <ActionIcon onClick={sidebar.toggle} variant="subtle">
                        <IconChevronRight size={20} />
                    </ActionIcon>
                )}
            </Group>

            <ScrollArea h="calc(100vh - 140px)">
                <Stack gap={0}>
                    {navData.map((item) => (
                        <NavLink
                            key={item.label}
                            active={active === item.label}
                            onClick={() => {
                                setActive(item.label);
                                changeurl(item?.href)
                                if (isMobile) mobile.close();
                            }}
                            label={
                                <Group justify="space-between" wrap="nowrap">
                                    <Group gap="sm">
                                        {item.icon}
                                        {sidebarOpened || isMobile ? <Text size="sm">{item.label}</Text> : null}
                                    </Group>
                                </Group>
                            }
                            styles={{
                                root: {
                                    borderRadius: theme.radius.md,
                                    padding: `${rem(8)} ${rem(12)}`,
                                    marginBottom: rem(4),
                                },
                            }}
                        />
                    ))}
                </Stack>

                <Divider my="md" />
            </ScrollArea>
        </>
    )
};

export default Sidebar