
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterPanel, DataType, FilterDefinitionsByField, Condition } from "@datavysta/vysta-react";
import DemoWrapper from "@/components/DemoWrapper";
import CodeToggle from "@/components/CodeToggle";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

// Define the filter definitions
const filterDefinitions: FilterDefinitionsByField = [
  {
    targetFieldName: "productName",
    label: "Product Name",
    dataType: DataType.String
  },
  {
    targetFieldName: "unitPrice",
    label: "Unit Price",
    dataType: DataType.Numeric
  },
  {
    targetFieldName: "unitsInStock",
    label: "Units In Stock",
    dataType: DataType.Numeric
  },
  {
    targetFieldName: "discontinued",
    label: "Discontinued",
    dataType: DataType.Boolean
  }
];

export function FilterPanelDemo() {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [appliedConditions, setAppliedConditions] = useState<Condition[]>([]);
  
  const handleApply = (newConditions: Condition[]) => {
    setAppliedConditions(newConditions);
    setConditions(newConditions);
  };
  
  const removeCondition = (index: number) => {
    const updatedConditions = [...appliedConditions.filter((_, i) => i !== index)];
    setAppliedConditions(updatedConditions);
    setConditions(updatedConditions);
  };
  
  const codeExample = `import { FilterPanel, DataType, FilterDefinitionsByField, Condition } from '@datavysta/vysta-react';
import { useState } from 'react';

const filterDefinitions: FilterDefinitionsByField = [
    {
        targetFieldName: "productName",
        label: "Product Name",
        dataType: DataType.String
    },
    {
        targetFieldName: "unitPrice",
        label: "Unit Price",
        dataType: DataType.Numeric
    }
];

function App() {
    const [conditions, setConditions] = useState<Condition[]>([]);

    return (
        <FilterPanel 
            conditions={conditions}
            onApply={setConditions}
            filterDefinitions={filterDefinitions}
        />
    );
}`;

  return (
    <DemoWrapper title="FilterPanel" description="Powerful data filtering component">
      <div className="space-y-6">
        <div className="text-foreground">
          <h3 className="text-xl font-medium">Product Filter</h3>
          <p className="text-muted-foreground mt-2">
            Filter products by various criteria including name, price, stock and status.
          </p>
        </div>
        
        <div className="border rounded-md p-6 bg-background">
          <FilterPanel 
            conditions={conditions}
            onApply={handleApply}
            filterDefinitions={filterDefinitions}
          />
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Applied Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {appliedConditions.length === 0 && (
                <p className="text-sm text-muted-foreground">No filters applied</p>
              )}
              
              {appliedConditions.map((condition, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <span>{condition.targetFieldName}: {condition.operator} {JSON.stringify(condition.values)}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => removeCondition(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <CodeToggle code={codeExample} language="tsx" />
      </div>
    </DemoWrapper>
  );
}
