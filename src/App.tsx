
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import { VystaMantineComponentProvider } from '@datavysta/vysta-react/mantine';
import { ThemeProvider } from "@/hooks/use-theme";

import Components from "./pages/Components";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <MantineProvider>
        <VystaMantineComponentProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/components" replace />} />
                <Route path="/components" element={<Components />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </VystaMantineComponentProvider>
      </MantineProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
