import { ThemeProvider, useTheme } from "@/hooks/use-theme";
import { VystaMantineComponentProvider } from "@datavysta/vysta-react/mantine";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Import styles for Mantine notifications
import "@mantine/notifications/styles.css";

import Components from "./pages/Components";

const queryClient = new QueryClient();

// Wrapper component to use the theme hook
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { mantineTheme } = useTheme();

  return (
    <MantineProvider theme={mantineTheme}>
      <VystaMantineComponentProvider>{children}</VystaMantineComponentProvider>
    </MantineProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <ThemeWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/components" replace />} />
            <Route path="/components" element={<Components />} />
            <Route path="*" element={<Navigate to="/components" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeWrapper>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
