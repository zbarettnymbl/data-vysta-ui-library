import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { SidebarProvider } from "@/components/sidebar";
import { DataGridDemo } from "@/demos/DataGridDemo";
import { FileUploadDemo } from "@/demos/FileUploadDemo";
import { FilterPanelDemo } from "@/demos/FilterPanelDemo";
import { LazyLoadListDemo } from "@/demos/LazyLoadListDemo";
import { Box, Text, ThemeIcon } from "@mantine/core";
import { Filter, Grid, List, Upload } from "lucide-react";
import { useState } from "react";

const Components = () => {
  const [activeComponent, setActiveComponent] = useState("datagrid");

  const menuItems = [
    {
      label: "DataGrid",
      icon: (
        <ThemeIcon size="sm" variant="light">
          <Grid size={16} />
        </ThemeIcon>
      ),
      active: activeComponent === "datagrid",
      onClick: () => setActiveComponent("datagrid"),
    },
    {
      label: "FilterPanel",
      icon: (
        <ThemeIcon size="sm" variant="light">
          <Filter size={16} />
        </ThemeIcon>
      ),
      active: activeComponent === "filterpanel",
      onClick: () => setActiveComponent("filterpanel"),
    },
    {
      label: "LazyLoadList",
      icon: (
        <ThemeIcon size="sm" variant="light">
          <List size={16} />
        </ThemeIcon>
      ),
      active: activeComponent === "lazyloadlist",
      onClick: () => setActiveComponent("lazyloadlist"),
    },
    {
      label: "FileUpload",
      icon: (
        <ThemeIcon size="sm" variant="light">
          <Upload size={16} />
        </ThemeIcon>
      ),
      active: activeComponent === "fileupload",
      onClick: () => setActiveComponent("fileupload"),
    },
  ];

  return (
    <SidebarProvider
      defaultOpen={true}
      header={<Logo />}
      footer={<ThemeSwitcher />}
      menuItems={menuItems}
    >
      <Box>
        <Box className="flex items-center border-b p-4">
          <Text fw={500}>Data Vysta React Components</Text>
        </Box>

        <Box p="md">
          {activeComponent === "datagrid" && <DataGridDemo />}
          {activeComponent === "filterpanel" && <FilterPanelDemo />}
          {activeComponent === "lazyloadlist" && <LazyLoadListDemo />}
          {activeComponent === "fileupload" && <FileUploadDemo />}
        </Box>
      </Box>
    </SidebarProvider>
  );
};

export default Components;
