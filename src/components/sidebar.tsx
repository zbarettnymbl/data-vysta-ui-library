import {
  AppShell,
  Box,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useEffect, useState } from "react";

type SidebarMenuItem = {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  children?: SidebarMenuItem[];
};

type SidebarMenuItemsProps = {
  items: SidebarMenuItem[];
};

function SidebarMenuItems({ items }: SidebarMenuItemsProps) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      {items.map((item, index) => (
        <NavLink
          key={index}
          label={item.label}
          leftSection={item.icon}
          active={item.active}
          onClick={item.onClick}
          childrenOffset={28}
          defaultOpened={false}
          variant={colorScheme === "dark" ? "filled" : "light"}
          styles={{
            root: {
              borderRadius: "0.375rem",
            },
          }}
        >
          {item.children &&
            item.children.map((child, childIndex) => (
              <NavLink
                key={childIndex}
                label={child.label}
                leftSection={child.icon}
                active={child.active}
                onClick={child.onClick}
                variant={colorScheme === "dark" ? "filled" : "light"}
              />
            ))}
        </NavLink>
      ))}
    </>
  );
}

export type SidebarProviderProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  menuItems: SidebarMenuItem[];
};

export function SidebarProvider({
  children,
  defaultOpen = true,
  header,
  footer,
  menuItems,
}: SidebarProviderProps) {
  const [opened, { toggle }] = useDisclosure(defaultOpen);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [mobileOpened, setMobileOpened] = useState(false);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  const isDark = colorScheme === "dark";

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !opened },
      }}
      padding="md"
      styles={{
        header: {
          backgroundColor: isDark
            ? "var(--mantine-color-dark-7)"
            : "var(--mantine-color-white)",
          borderBottom: `1px solid ${
            isDark
              ? "var(--mantine-color-dark-4)"
              : "var(--mantine-color-gray-2)"
          }`,
        },
        navbar: {
          backgroundColor: isDark
            ? "var(--mantine-color-dark-7)"
            : "var(--mantine-color-white)",
          borderRight: `1px solid ${
            isDark
              ? "var(--mantine-color-dark-4)"
              : "var(--mantine-color-gray-2)"
          }`,
        },
        main: {
          backgroundColor: isDark
            ? "var(--mantine-color-dark-8)"
            : "var(--mantine-color-gray-0)",
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={() => setMobileOpened(!mobileOpened)}
            hiddenFrom="sm"
            size="sm"
          />
          {header}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p={0}>
        <AppShell.Section p="md" component={ScrollArea}>
          <SidebarMenuItems items={menuItems} />
        </AppShell.Section>

        {footer && (
          <AppShell.Section p="md" h={60}>
            {footer}
          </AppShell.Section>
        )}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

// Export these as separate components to make them easier to use
export const Sidebar = AppShell.Navbar;
export const SidebarHeader = Box;
export const SidebarContent = ScrollArea;
export const SidebarFooter = Box;
export const SidebarGroup = Box;
export const SidebarGroupLabel = Text;
export const SidebarMenu = NavLink.Group;
export const SidebarMenuItem = NavLink;
export const SidebarMenuButton = UnstyledButton;
export const SidebarInset = AppShell.Main;
