export interface ILayoutProps {
  sidebarOpened: boolean;
  isMobile: boolean;
  sidebar: any;
  mobile: any;
  mobileOpened?: boolean
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  badgeColor?: string;
}