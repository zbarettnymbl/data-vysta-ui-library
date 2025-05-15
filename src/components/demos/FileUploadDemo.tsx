
import { useMemo } from "react";
import { VystaClient, VystaFileService } from "@datavysta/vysta-client";
import { FileUpload } from "@datavysta/vysta-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import CodeBlock from "../CodeBlock";

export const FileUploadDemo = () => {
  // Create a mocked file service for demo purposes
  const fileService = useMemo(() => {
    const client = new VystaClient({ baseUrl: "http://localhost:8080" });
    return new VystaFileService(client);
  }, []);

  const code = `import { FileUpload } from '@datavysta/vysta-react';
import { VystaClient, VystaFileService } from '@datavysta/vysta-client';
import { useMemo } from 'react';

function MyComponent() {
  const fileService = useMemo(() => {
    const client = new VystaClient({ baseUrl: '/api' });
    return new VystaFileService(client);
  }, []);

  return (
    <FileUpload
      fileService={fileService}
      allowedFileTypes={['.jpg', '.png', 'image/*', '.pdf']}
      filename="custom-name.jpg"
      autoProceed={true}
      onUploadSuccess={(fileId, fileName) => {
        console.log(\`File uploaded: \${fileName} with ID: \${fileId}\`);
      }}
    />
  );
}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">FileUpload</h1>
        <p className="text-lg text-muted-foreground">
          A file upload component that integrates with Vysta's file service and uses Uppy for the upload interface.
        </p>
      </div>
      
      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Demo Only</AlertTitle>
        <AlertDescription>
          This is a demo component. In a real application, this would connect to a proper backend service.
          File uploads won't actually work in this demo environment.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>FileUpload Demo</CardTitle>
              <CardDescription>
                A drag-and-drop file upload component with progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <FileUpload
                  fileService={fileService}
                  allowedFileTypes={['.jpg', '.png', 'image/*', '.pdf']}
                  autoProceed={true}
                  onUploadSuccess={(fileId, fileName) => {
                    console.log(`File uploaded: ${fileName} with ID: ${fileId}`);
                    alert(`File upload simulation for: ${fileName}`);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>FileUpload Implementation</CardTitle>
              <CardDescription>Example code for implementing FileUpload component</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={code} language="tsx" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Drag and drop interface</li>
          <li>File type restrictions</li>
          <li>Upload progress tracking</li>
          <li>Automatic or manual upload triggering</li>
          <li>Integration with Vysta's file service</li>
          <li>Support for custom file naming</li>
        </ul>
      </div>
    </div>
  );
};
