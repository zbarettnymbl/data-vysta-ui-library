
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import DemoWrapper from "@/components/DemoWrapper";

export function FileUploadDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadProgress(0);
    }
  };
  
  const simulateUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  return (
    <DemoWrapper title="File Upload" description="Handle file uploads with progress tracking">
      <div className="space-y-6">
        <div className="text-foreground">
          <h3 className="text-xl font-medium">Upload Files</h3>
          <p className="text-muted-foreground mt-2">
            Select files to upload to your account.
          </p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="file"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
          />
          
          {selectedFile && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground">{Math.round(selectedFile.size / 1024)} KB</span>
              </div>
              
              <Progress value={uploadProgress} className="h-2" />
              
              <div className="flex justify-end">
                <Button 
                  onClick={simulateUpload} 
                  disabled={isUploading}
                  size="sm"
                >
                  {isUploading ? 'Uploading...' : 'Upload File'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DemoWrapper>
  );
}
