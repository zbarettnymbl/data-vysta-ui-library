import { cn } from "@/lib/utils";
import React from "react";

interface DemoWrapperProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  description?: string;
}

export function DemoWrapper({
  children,
  className,
  title,
  description,
}: DemoWrapperProps) {
  return (
    <div className="space-y-8">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className={cn("rounded-md border p-6", className)}>{children}</div>
    </div>
  );
}

export default DemoWrapper;
