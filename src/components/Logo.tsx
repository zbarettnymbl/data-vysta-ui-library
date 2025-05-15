
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/ba375976-144f-42f5-bd4f-73e04b2f6bdd.png" 
        alt="DataVysta Logo" 
        className="h-8" 
      />
    </div>
  );
}
