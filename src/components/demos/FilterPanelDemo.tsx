
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterPanel } from "@datavysta/vysta-react";
import { DataType } from "@datavysta/vysta-react";
import { FilterDefinitionsByField } from "@datavysta/vysta-react";
import { Condition } from "@datavysta/vysta-react";
import DemoWrapper from "@/components/DemoWrapper";
import CodeToggle from "@/components/CodeToggle";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";

export function FilterPanelDemo() {
  const [conditions, setConditions] = useState<Condition[]>([]);
  
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
  
  const handleResetFilters = () => {
    setConditions([]);
  };
  
  const getFilterSummary = (condition: Condition) => {
    const def = filterDefinitions.find(d => d.targetFieldName === condition.targetFieldName);
    if (!def) return '';
    
    let valueDisplay = condition.value;
    if (condition.value === true) valueDisplay = 'Yes';
    if (condition.value === false) valueDisplay = 'No';
    
    return `${def.label} ${condition.operator} ${valueDisplay}`;
  };
  
  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
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
    <DemoWrapper title="Filter Panel" description="Advanced filtering interface">
      <div className="space-y-6">
        <div className="text-foreground">
          <h3 className="text-xl font-medium">Product Filters</h3>
          <p className="text-muted-foreground mt-2">
            Use filters to narrow down your search results.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <div className="space-y-4 border rounded-md p-4">
            <FilterPanel
              filterDefinitions={filterDefinitions}
              conditions={conditions}
              onApply={setConditions}
              onChange={setConditions}
            />
            
            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                Reset
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-foreground font-medium">Results</div>
            
            {conditions.length > 0 ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {conditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {getFilterSummary(condition)}
                      <XIcon 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeCondition(index)}
                      />
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2 border-t pt-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium text-foreground">Sample Result {item}</div>
                        <div className="text-sm text-muted-foreground">Description for result item {item}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border rounded-md p-8 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>No filters applied</p>
                  <p className="text-sm">Use the filter panel to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <CodeToggle code={codeExample} language="tsx" />
      </div>
    </DemoWrapper>
  );
}
