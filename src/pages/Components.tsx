
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Component } from "lucide-react";
import ButtonDemo from "@/components/demos/ButtonDemo";
import InputDemo from "@/components/demos/InputDemo";
import CardDemo from "@/components/demos/CardDemo";
import ToastDemo from "@/components/demos/ToastDemo";
import AvatarDemo from "@/components/demos/AvatarDemo";
import ToggleDemo from "@/components/demos/ToggleDemo";
import AccordionDemo from "@/components/demos/AccordionDemo";
import TableDemo from "@/components/demos/TableDemo";

const Components = () => {
  const [activeTab, setActiveTab] = useState("buttons");
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Component className="h-6 w-6" />
            <Link to="/" className="text-lg font-semibold">UI Library</Link>
          </div>
          <nav className="ml-auto flex items-center gap-4">
            <Link to="/" className="text-sm font-medium">
              Home
            </Link>
            <Link to="/components" className="text-sm font-medium font-bold">
              Components
            </Link>
            <a href="https://github.com/datavysta/vysta-react" target="_blank" rel="noopener noreferrer" className="text-sm font-medium">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Components Showcase */}
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-3xl font-bold">UI Components</h1>
          <p className="mb-8 text-muted-foreground">
            A collection of beautifully designed UI components that you can copy and paste into your projects.
          </p>
          
          <Tabs defaultValue="buttons" value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-8">
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="toasts">Toasts</TabsTrigger>
              <TabsTrigger value="avatars">Avatars</TabsTrigger>
              <TabsTrigger value="toggles">Toggles</TabsTrigger>
              <TabsTrigger value="accordions">Accordions</TabsTrigger>
              <TabsTrigger value="tables">Tables</TabsTrigger>
            </TabsList>
            <TabsContent value="buttons" className="space-y-4">
              <h2 className="text-xl font-semibold">Buttons</h2>
              <p className="text-muted-foreground">Interactive button components with different variants and sizes.</p>
              <div className="mt-8">
                <ButtonDemo />
              </div>
            </TabsContent>
            <TabsContent value="inputs" className="space-y-4">
              <h2 className="text-xl font-semibold">Inputs</h2>
              <p className="text-muted-foreground">Form input components for collecting user data.</p>
              <div className="mt-8">
                <InputDemo />
              </div>
            </TabsContent>
            <TabsContent value="cards" className="space-y-4">
              <h2 className="text-xl font-semibold">Cards</h2>
              <p className="text-muted-foreground">Versatile card components for displaying content.</p>
              <div className="mt-8">
                <CardDemo />
              </div>
            </TabsContent>
            <TabsContent value="toasts" className="space-y-4">
              <h2 className="text-xl font-semibold">Toasts</h2>
              <p className="text-muted-foreground">Notifications to inform users about actions or events.</p>
              <div className="mt-8">
                <ToastDemo />
              </div>
            </TabsContent>
            <TabsContent value="avatars" className="space-y-4">
              <h2 className="text-xl font-semibold">Avatars</h2>
              <p className="text-muted-foreground">User profile image components with fallback support.</p>
              <div className="mt-8">
                <AvatarDemo />
              </div>
            </TabsContent>
            <TabsContent value="toggles" className="space-y-4">
              <h2 className="text-xl font-semibold">Toggles</h2>
              <p className="text-muted-foreground">Interactive toggle components for enabling or disabling options.</p>
              <div className="mt-8">
                <ToggleDemo />
              </div>
            </TabsContent>
            <TabsContent value="accordions" className="space-y-4">
              <h2 className="text-xl font-semibold">Accordions</h2>
              <p className="text-muted-foreground">Expandable content sections for organizing information.</p>
              <div className="mt-8">
                <AccordionDemo />
              </div>
            </TabsContent>
            <TabsContent value="tables" className="space-y-4">
              <h2 className="text-xl font-semibold">Tables</h2>
              <p className="text-muted-foreground">Structured data display components with various styling options.</p>
              <div className="mt-8">
                <TableDemo />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Components;
