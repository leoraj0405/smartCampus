import { ActionIcon, Avatar, Box, Burger, Divider, Group, Indicator, Menu, Tooltip, Image, useMantineTheme, Text, TextInput } from "@mantine/core"
import { IconSearch, IconBell, IconSun, IconUserCircle, IconCreditCard, IconLock, IconLogout, IconX } from "@tabler/icons-react"
import type { ILayoutProps } from "../types/layout"
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

function LiveTime() {
    const [time, setTime] = useState(dayjs().format('hh:mm:ss A'));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format('hh:mm:ss A'));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <span>{time}</span>;
}

const Header = (props: ILayoutProps) => {
    const { mobileOpened, mobile, isMobile, sidebarOpened } = props
    const theme = useMantineTheme();
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)


    return (
        <Box h={70} px="lg" bg="white" style={{ borderBottom: `1px solid ${theme.colors.gray[3]}` }}>
            <Group h="100%" justify="space-between">
                <Group>
                    {isMobile && <Burger opened={mobileOpened} onClick={mobile.toggle} size="sm" />}
                    <Box>
                        {(isMobile || !sidebarOpened) && (
                            <Image
                                src={`/logo.png`}
                                w={70}
                                h={50}
                            />
                        )}
                    </Box>
                </Group>

                <Group>
                    <Text c='dimmed' size="md">{LiveTime()}</Text>
                    {isSearchOpen ? (
                        <TextInput
                            leftSection={<IconSearch size={18} />}
                            placeholder="Enter staff or student"
                            rightSection={<IconX size={14} onClick={() => setIsSearchOpen(false)} />}
                        />
                    ) : (
                        <Tooltip label="Search">
                            <ActionIcon variant="light"><IconSearch onClick={() => setIsSearchOpen(!isSearchOpen)} size={18} /></ActionIcon>
                        </Tooltip>
                    )}

                    <Indicator color="red" size={8} processing>
                        <ActionIcon variant="light"><IconBell size={18} /></ActionIcon>
                    </Indicator>

                    <ActionIcon variant="light"><IconSun size={18} /></ActionIcon>

                    <Menu position="bottom-end">
                        <Menu.Target>
                            <Avatar radius="md" size={36} />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Account</Menu.Label>
                            <Menu.Item leftSection={<IconUserCircle size={16} />}>Profile</Menu.Item>
                            <Menu.Item leftSection={<IconCreditCard size={16} />}>Billing</Menu.Item>
                            <Menu.Item leftSection={<IconLock size={16} />}>Security</Menu.Item>
                            <Divider my="xs" />
                            <Menu.Item color="red" leftSection={<IconLogout size={16} />}>
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
        </Box>
    )
}

export default Header