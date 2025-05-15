
import { useState } from "react";
import { FilterPanel } from "@datavysta/vysta-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "../CodeBlock";

// Create mock enums and types since we can't directly import them
enum DataType {
  String = "string",
  Numeric = "numeric",
  Boolean = "boolean",
  Date = "date"
}

// Mock the filter definition type
interface FilterDefinition {
  targetFieldName: string;
  label: string;
  dataType: DataType;
}

type FilterDefinitionsByField = FilterDefinition[];

// Mock condition type 
interface Condition {
  id?: string;
  type?: string;
  active?: boolean;
  valid?: boolean;
  field: string;
  operator?: string;
  value: any;
}

export const FilterPanelDemo = () => {
  const [conditions, setConditions] = useState<Condition[]>([]);

  // Define filter definitions using the correct DataType enum
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
    },
    {
      targetFieldName: "orderDate",
      label: "Order Date",
      dataType: DataType.Date
    }
  ];

  // Fix the handler to properly handle the Condition type
  const handleApply = (newConditions: any[]) => {
    setConditions(newConditions as Condition[]);
  };

  const code = `import { FilterPanel } from '@datavysta/vysta-react';
import { useState } from 'react';

// Define types (use actual imports in production)
enum DataType {
  String = "string", 
  Numeric = "numeric",
  Boolean = "boolean",
  Date = "date"
}

function FilterExample() {
  const [conditions, setConditions] = useState([]);

  const filterDefinitions = [
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
      targetFieldName: "discontinued",
      label: "Discontinued",
      dataType: DataType.Boolean
    },
    {
      targetFieldName: "orderDate",
      label: "Order Date",
      dataType: DataType.Date
    }
  ];

  const handleApply = (newConditions) => {
    setConditions(newConditions);
  };

  return (
    <FilterPanel 
      conditions={conditions}
      onApply={handleApply}
      filterDefinitions={filterDefinitions}
    />
  );
}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Filter Panel</h1>
        <p className="text-lg text-muted-foreground">
          A powerful and flexible filtering interface for your data with support for various data types.
        </p>
      </div>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>FilterPanel Demo</CardTitle>
              <CardDescription>
                A configurable filter panel that allows users to create complex filter conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <FilterPanel 
                  conditions={conditions as any}
                  onApply={handleApply}
                  filterDefinitions={filterDefinitions as any}
                />
              </div>
              
              {conditions.length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="font-medium">Applied Filters:</p>
                  <pre className="mt-2 text-sm overflow-x-auto">
                    {JSON.stringify(conditions, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>FilterPanel Implementation</CardTitle>
              <CardDescription>Example code for implementing FilterPanel component</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={code} language="tsx" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Supported Filter Types</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>String</strong>: Text fields with operations like contains, equals, starts with</li>
          <li><strong>Numeric</strong>: Numeric fields with operations like equals, greater than, less than</li>
          <li><strong>Boolean</strong>: True/false fields</li>
          <li><strong>Date</strong>: Date fields with operations like equals, before, after</li>
        </ul>
      </div>
    </div>
  );
};
