import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { useDisclosure } from "@mantine/hooks";
import { useSidebarStore } from "../store/sidebarStore";
import Footer from "./Footer";

export default function AppShellLayout() {
  // For mobile expand state (NOT Zustand)
  const [mobileOpen, { open, close }] = useDisclosure(false);
  const collapsed = useSidebarStore((s) => s.collapsed);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: collapsed ? 100 : 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpen },   // Mobile hides sidebar until opened
      }}
      padding="md"
    >
      <AppShell.Header>
        <TopHeader openMobileSidebar={open} />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar mobileOpen={mobileOpen} closeMobile={close} />
      </AppShell.Navbar>

      <AppShell.Main style={{ paddingBottom: 60 }}>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
