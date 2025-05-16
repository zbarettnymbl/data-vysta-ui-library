import { useTheme } from "@/hooks/use-theme";
import { Button, Menu } from "@mantine/core";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

type Theme = "dark" | "light" | "system";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [opened, setOpened] = useState(false);

  // Define theme options
  const themeOptions: { value: Theme; label: string; icon: JSX.Element }[] = [
    { value: "dark", label: "Dark", icon: <Moon size={16} /> },
    { value: "light", label: "Light", icon: <Sun size={16} /> },
    { value: "system", label: "System", icon: <Monitor size={16} /> },
  ];

  // Get the current theme icon
  const getCurrentThemeIcon = () => {
    const currentTheme = themeOptions.find((option) => option.value === theme);
    return currentTheme ? currentTheme.icon : <Sun size={16} />;
  };

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      width={200}
      position="top-start"
      shadow="md"
    >
      <Menu.Target>
        <Button variant="subtle" size="sm" leftSection={getCurrentThemeIcon()}>
          {theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {themeOptions.map((option) => (
          <Menu.Item
            key={option.value}
            leftSection={option.icon}
            rightSection={theme === option.value ? <Check size={16} /> : null}
            onClick={() => {
              setTheme(option.value);
              setOpened(false);
            }}
            style={{
              backgroundColor:
                theme === option.value ? "var(--accent)" : undefined,
              color:
                theme === option.value ? "var(--accent-foreground)" : undefined,
            }}
          >
            {option.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
