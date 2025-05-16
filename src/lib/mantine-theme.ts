import { MantineColorsTuple, createTheme } from "@mantine/core";

// Convert HSL to hex for Mantine
function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Light mode colors from CSS variables
const lightColors = {
  background: hslToHex(0, 0, 100),
  foreground: hslToHex(222.2, 84, 4.9),
  card: hslToHex(0, 0, 100),
  cardForeground: hslToHex(222.2, 84, 4.9),
  popover: hslToHex(0, 0, 100),
  popoverForeground: hslToHex(222.2, 84, 4.9),
  primary: hslToHex(220, 10, 40),
  primaryForeground: hslToHex(0, 0, 98),
  secondary: hslToHex(220, 10, 96),
  secondaryForeground: hslToHex(222.2, 47.4, 11.2),
  muted: hslToHex(220, 10, 96),
  mutedForeground: hslToHex(215.4, 16.3, 46.9),
  accent: hslToHex(220, 10, 90),
  accentForeground: hslToHex(222.2, 47.4, 11.2),
  destructive: hslToHex(0, 84.2, 60.2),
  destructiveForeground: hslToHex(210, 40, 98),
  border: hslToHex(214.3, 31.8, 91.4),
  input: hslToHex(214.3, 31.8, 91.4),
  ring: hslToHex(220, 10, 40),
};

// Dark mode colors from CSS variables
const darkColors = {
  background: hslToHex(220, 10, 8),
  foreground: hslToHex(0, 0, 98),
  card: hslToHex(220, 10, 10),
  cardForeground: hslToHex(0, 0, 98),
  popover: hslToHex(220, 10, 10),
  popoverForeground: hslToHex(0, 0, 98),
  primary: hslToHex(220, 10, 70),
  primaryForeground: hslToHex(220, 10, 10),
  secondary: hslToHex(220, 10, 15),
  secondaryForeground: hslToHex(0, 0, 98),
  muted: hslToHex(220, 10, 15),
  mutedForeground: hslToHex(215, 10, 70),
  accent: hslToHex(220, 10, 20),
  accentForeground: hslToHex(0, 0, 98),
  destructive: hslToHex(0, 62.8, 30.6),
  destructiveForeground: hslToHex(0, 0, 98),
  border: hslToHex(220, 10, 18),
  input: hslToHex(220, 10, 18),
  ring: hslToHex(220, 10, 70),
};

// Define proper dark palette values (0=lightest, 9=darkest)
const mantineDarkPalette: MantineColorsTuple = [
  "#C1C2C5", // 0 - lightest
  "#A6A7AB",
  "#909296",
  "#5c5f66",
  "#373A40",
  "#2C2E33",
  "#25262b",
  "#1A1B1E",
  "#141517",
  "#101113", // 9 - darkest
] as MantineColorsTuple;

// Create light theme
export const lightTheme = createTheme({
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  defaultRadius: "md",
  colors: {
    // Define proper dark palette for the light theme
    dark: mantineDarkPalette,
    gray: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529",
    ] as MantineColorsTuple,
    primary: [
      hslToHex(220, 10, 95),
      hslToHex(220, 10, 90),
      hslToHex(220, 10, 80),
      hslToHex(220, 10, 70),
      hslToHex(220, 10, 60),
      hslToHex(220, 10, 50),
      hslToHex(220, 10, 40), // Primary color
      hslToHex(220, 10, 30),
      hslToHex(220, 10, 20),
      hslToHex(220, 10, 10),
    ] as MantineColorsTuple,
    red: [
      "#fff5f5",
      "#ffe3e3",
      "#ffc9c9",
      "#ffa8a8",
      "#ff8787",
      "#ff6b6b",
      "#fa5252",
      "#f03e3e",
      "#e03131",
      "#c92a2a",
    ] as MantineColorsTuple,
  },

  components: {
    Button: {
      defaultProps: {
        size: "md",
        radius: "md",
      },
      styles: {
        root: {
          // Match shadcn/ui button styling
          fontWeight: 500,
        },
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        padding: "lg",
      },
    },
    Badge: {
      defaultProps: {
        radius: "md",
      },
    },
    // Add other component styles as needed
  },
});

// Create dark theme
export const darkTheme = createTheme({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Keep the dark colors the same - these are already dark
    dark: mantineDarkPalette,
    primary: [
      hslToHex(220, 10, 95),
      hslToHex(220, 10, 90),
      hslToHex(220, 10, 80),
      hslToHex(220, 10, 70), // Primary color for dark mode
      hslToHex(220, 10, 60),
      hslToHex(220, 10, 50),
      hslToHex(220, 10, 40),
      hslToHex(220, 10, 30),
      hslToHex(220, 10, 20),
      hslToHex(220, 10, 10),
    ] as MantineColorsTuple,
  },
});

// Utility function to get the appropriate theme based on colorScheme
export function getTheme(colorScheme: "light" | "dark") {
  return colorScheme === "dark" ? darkTheme : lightTheme;
}

export default lightTheme;
