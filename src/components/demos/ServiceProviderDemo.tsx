
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVystaClient } from "@/lib/vysta-mocks";
import DemoWrapper from "@/components/DemoWrapper";

export function ServiceProviderDemo() {
  const { isInitialized, services } = useVystaClient();

  return (
    <DemoWrapper title="Service Provider" description="Integration with backend services">
      <div className="space-y-6">
        <div className="text-foreground">
          <h3 className="text-xl font-medium">Vysta Service Provider</h3>
          <p className="text-muted-foreground mt-2">
            The Vysta service provider allows you to connect to backend services easily.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connection Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-foreground">
                  {isInitialized ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.id} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-foreground">{service.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DemoWrapper>
  );
}
