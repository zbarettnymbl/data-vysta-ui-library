
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import CodeBlock from "../CodeBlock";

export const ServiceProviderDemo = () => {
  const code = `import { VystaServiceProvider, useVystaServices } from '@datavysta/vysta-react';
import { VystaConfig } from '@datavysta/vysta-client';

const config: VystaConfig = {
  baseUrl: '/api',
  debug: true,
};

function App() {
  return (
    <VystaServiceProvider config={config} apps={["Northwinds"]}>
      <YourApp />
    </VystaServiceProvider>
  );
}

// In any child component:
function MyComponent() {
  const {
    roleService,
    permissionService,
    profile,
    permissions,
    canSelectConnection,
    isAuthenticated,
    profileLoading,
    profileError,
    loginLoading,
    loginError,
    auth,
  } = useVystaServices();

  // Example: login
  const handleLogin = async () => {
    await auth.login('user@example.com', 'password');
  };

  // Example: logout
  const handleLogout = async () => {
    await auth.logout();
  };

  // Check permissions
  const canAccessProduct = canSelectConnection('Northwinds');

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {profile?.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}

      {canAccessProduct && <p>You can access the Northwinds app</p>}
    </div>
  );
}`;

  const setupCode = `import { MantineProvider } from '@mantine/core';
import { VystaMantineComponentProvider } from '@datavysta/vysta-react/mantine';
import { VystaServiceProvider } from '@datavysta/vysta-react';

function App() {
  return (
    <MantineProvider>
      <VystaMantineComponentProvider>
        <VystaServiceProvider config={{ baseUrl: '/api' }} apps={["YourApp"]}>
          {/* Your app components */}
        </VystaServiceProvider>
      </VystaMantineComponentProvider>
    </MantineProvider>
  );
}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">VystaServiceProvider</h1>
        <p className="text-lg text-muted-foreground">
          A core context provider that delivers authentication, user profile, and permission management to your application.
        </p>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Required</AlertTitle>
        <AlertDescription>
          The VystaServiceProvider needs to be set up at the root of your application with a valid backend configuration.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="code">
        <TabsList>
          <TabsTrigger value="code">Code Example</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="code" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>VystaServiceProvider Usage</CardTitle>
              <CardDescription>Complete example of VystaServiceProvider setup and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={code} language="tsx" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="setup" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Setup with Mantine</CardTitle>
              <CardDescription>Setting up the VystaServiceProvider with Mantine integration</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={setupCode} language="tsx" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Context Values</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>roleService</strong>: VystaRoleService instance for managing roles</li>
          <li><strong>permissionService</strong>: VystaPermissionService instance for managing permissions</li>
          <li><strong>profile</strong>: The user's profile object (or null if not loaded)</li>
          <li><strong>permissions</strong>: A record mapping app names to their permissions</li>
          <li><strong>canSelectConnection</strong>: Helper to check if the user has SELECT permission for a given app</li>
          <li><strong>isAuthenticated</strong>: Boolean, true if a user profile is loaded</li>
          <li><strong>profileLoading</strong>: Boolean, true while profile/permissions are loading</li>
          <li><strong>profileError</strong>: Any error encountered during profile/permissions loading</li>
          <li><strong>loginLoading</strong>: Boolean, true while a login/logout is in progress</li>
          <li><strong>loginError</strong>: Any error encountered during login/logout</li>
          <li><strong>auth</strong>: An object with authentication methods (login, logout, etc.)</li>
        </ul>
      </div>
    </div>
  );
};
