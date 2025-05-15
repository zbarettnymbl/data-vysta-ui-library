import { useTheme } from "@/hooks/use-theme";
import { Group, Switch, useMantineTheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const mantineTheme = useMantineTheme();

  return (
    <Group justify="center">
      <Switch
        size="md"
        thumbIcon={
          theme === "dark" ? (
            <Sun size={12} color={mantineTheme.colors.yellow[4]} />
          ) : (
            <Moon size={12} color={mantineTheme.colors.blue[6]} />
          )
        }
        checked={theme === "dark"}
        onChange={(event) =>
          setTheme(event.currentTarget.checked ? "dark" : "light")
        }
        label={theme === "dark" ? "Light Mode" : "Dark Mode"}
      />
    </Group>
  );
}
