
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center">
      <Toggle
        aria-label="Toggle dark mode"
        pressed={theme === "dark"}
        onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        <span className="ml-2 text-xs">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      </Toggle>
    </div>
  );
}
