import { useState } from "react";
import { FilterPanel } from "@datavysta/vysta-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "../CodeBlock";

// Define type for filter definition
type DataType = 'string' | 'numeric' | 'boolean' | 'date';

interface FilterDefinition {
  targetFieldName: string;
  label: string;
  dataType: DataType;
}

type FilterDefinitionsByField = FilterDefinition[];

// Define type for Condition
interface Condition {
  field: string;
  operator: string;
  value: any;
}

export const FilterPanelDemo = () => {
  const [conditions, setConditions] = useState<Condition[]>([]);

  // Define filter definitions
  const filterDefinitions: FilterDefinitionsByField = [
    {
      targetFieldName: "productName",
      label: "Product Name",
      dataType: 'string'
    },
    {
      targetFieldName: "unitPrice",
      label: "Unit Price",
      dataType: 'numeric'
    },
    {
      targetFieldName: "unitsInStock",
      label: "Units In Stock",
      dataType: 'numeric'
    },
    {
      targetFieldName: "discontinued",
      label: "Discontinued",
      dataType: 'boolean'
    },
    {
      targetFieldName: "orderDate",
      label: "Order Date",
      dataType: 'date'
    }
  ];

  const code = `import { FilterPanel } from '@datavysta/vysta-react';
import DataType from '@datavysta/vysta-react/components/Models/DataType';
import { FilterDefinitionsByField } from '@datavysta/vysta-react/components/Filter/FilterDefinitionsByField';
import { Condition } from '@datavysta/vysta-client';
import { useState } from 'react';

function FilterExample() {
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

  return (
    <FilterPanel 
      conditions={conditions}
      onApply={setConditions}
      filterDefinitions={filterDefinitions}
    />
  );
}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">FilterPanel</h1>
        <p className="text-lg text-muted-foreground">
          A flexible and powerful filtering interface for building complex data queries.
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
                Try building complex filter conditions with different data types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <FilterPanel 
                  conditions={conditions}
                  onApply={setConditions}
                  filterDefinitions={filterDefinitions}
                />
              </div>
              
              {conditions.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Current Filter Conditions:</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
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
        <h2 className="text-xl font-semibold">Supported Data Types</h2>
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
