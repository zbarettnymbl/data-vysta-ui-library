
import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Database, Grid, Filter, List, Upload, Shield, Keyboard, Layout, Square } from "lucide-react";
import { DataGridDemo } from "@/components/demos/DataGridDemo";
import { FilterPanelDemo } from "@/components/demos/FilterPanelDemo";
import { LazyLoadListDemo } from "@/components/demos/LazyLoadListDemo";
import { FileUploadDemo } from "@/components/demos/FileUploadDemo";
import { ServiceProviderDemo } from "@/components/demos/ServiceProviderDemo";
import InputDemo from "@/components/demos/InputDemo";
import ButtonDemo from "@/components/demos/ButtonDemo";
import CardDemo from "@/components/demos/CardDemo";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Components = () => {
  const [activeComponent, setActiveComponent] = useState("datagrid");
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Components</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeComponent === "datagrid"}
                    onClick={() => setActiveComponent("datagrid")}
                  >
                    <Grid className="h-4 w-4" />
                    <span>DataGrid</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeComponent === "filterpanel"} 
                    onClick={() => setActiveComponent("filterpanel")}
                  >
                    <Filter className="h-4 w-4" />
                    <span>FilterPanel</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeComponent === "lazyloadlist"} 
                    onClick={() => setActiveComponent("lazyloadlist")}
                  >
                    <List className="h-4 w-4" />
                    <span>LazyLoadList</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeComponent === "fileupload"} 
                    onClick={() => setActiveComponent("fileupload")}
                  >
                    <Upload className="h-4 w-4" />
                    <span>FileUpload</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeComponent === "serviceprovider"} 
                    onClick={() => setActiveComponent("serviceprovider")}
                  >
                    <Shield className="h-4 w-4" />
                    <span>ServiceProvider</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeComponent === "inputs"} 
                    onClick={() => setActiveComponent("inputs")}
                  >
                    <Keyboard className="h-4 w-4" />
                    <span>Inputs</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeComponent === "buttons"} 
                    onClick={() => setActiveComponent("buttons")}
                  >
                    <Square className="h-4 w-4" />
                    <span>Buttons</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeComponent === "cards"} 
                    onClick={() => setActiveComponent("cards")}
                  >
                    <Layout className="h-4 w-4" />
                    <span>Cards</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <ThemeSwitcher />
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="flex items-center border-b p-4">
            <SidebarTrigger className="mr-2" />
            <h1 className="font-medium text-foreground">Vysta React Components</h1>
          </div>
          
          <div className="container py-8">
            {activeComponent === "datagrid" && <DataGridDemo />}
            {activeComponent === "filterpanel" && <FilterPanelDemo />}
            {activeComponent === "lazyloadlist" && <LazyLoadListDemo />}
            {activeComponent === "fileupload" && <FileUploadDemo />}
            {activeComponent === "serviceprovider" && <ServiceProviderDemo />}
            {activeComponent === "inputs" && <InputDemo />}
            {activeComponent === "buttons" && <ButtonDemo />}
            {activeComponent === "cards" && <CardDemo />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Components;
