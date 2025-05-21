import DemoWrapper from "@/components/DemoWrapper";
import { useVystaClient } from "@/lib/vysta-mocks";
import { FileUpload } from "@datavysta/vysta-react";
import type { VystaFileService } from "@datavysta/vysta-client";

export function FileUploadDemo() {
  const { services } = useVystaClient();

  // Mock file service from the services available in the client
  const fileService = services.find(
    (service) => service.id === "4"
  ) as VystaFileService | undefined;

  const handleUploadSuccess = (fileId: string, fileName: string) => {
    console.log(`File uploaded successfully: ${fileName} with ID: ${fileId}`);
  };

  // Custom styles using CSS variables
  const customStyles = {
    container: {
      backgroundColor: "var(--vysta-fileupload-bg)",
      border: "1px solid var(--vysta-fileupload-border)",
      padding: "1rem",
      borderRadius: "0.375rem",
    },
  };

  return (
    <DemoWrapper
      title="File Upload"
      description="Handle file uploads with Vysta File Service integration"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium">Upload Files</h3>
          <p className="text-muted-foreground mt-2">
            Upload files to Vysta's file service with support for drag and drop,
            file type restrictions, and progress tracking.
          </p>
        </div>

        <div className="space-y-4">
          {fileService ? (
            <div style={customStyles.container}>
              <FileUpload
                fileService={fileService}
                allowedFileTypes={[
                  ".jpg",
                  ".png",
                  ".pdf",
                  "image/*",
                  "application/pdf",
                ]}
                autoProceed={false}
                onUploadSuccess={handleUploadSuccess}
              />
            </div>
          ) : (
            <div className="p-4 border border-yellow-200 bg-yellow-50 text-yellow-800 rounded-md">
              <p>
                File service not available. This is a demo environment. In a
                real application, you would provide a VystaFileService instance.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoWrapper>
  );
}
