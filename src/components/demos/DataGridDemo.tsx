
import { useMemo } from "react";
import { DataGrid } from "@datavysta/vysta-react";
import { VystaClient, VystaService } from "@datavysta/vysta-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "../CodeBlock";

// Define product type
interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
  discontinued: boolean;
}

// Mock service for demo purposes
class MockProductService extends VystaService<Product> {
  private products: Product[] = [
    { productId: 1, productName: "Chai", unitPrice: 18.0, unitsInStock: 39, discontinued: false },
    { productId: 2, productName: "Chang", unitPrice: 19.0, unitsInStock: 17, discontinued: false },
    { productId: 3, productName: "Aniseed Syrup", unitPrice: 10.0, unitsInStock: 13, discontinued: false },
    { productId: 4, productName: "Chef Anton's Cajun Seasoning", unitPrice: 22.0, unitsInStock: 53, discontinued: false },
    { productId: 5, productName: "Chef Anton's Gumbo Mix", unitPrice: 21.35, unitsInStock: 0, discontinued: true },
    { productId: 6, productName: "Grandma's Boysenberry Spread", unitPrice: 25.0, unitsInStock: 120, discontinued: false },
    { productId: 7, productName: "Uncle Bob's Organic Dried Pears", unitPrice: 30.0, unitsInStock: 15, discontinued: false },
    { productId: 8, productName: "Northwoods Cranberry Sauce", unitPrice: 40.0, unitsInStock: 6, discontinued: false },
    { productId: 9, productName: "Mishi Kobe Niku", unitPrice: 97.0, unitsInStock: 29, discontinued: true },
    { productId: 10, productName: "Ikura", unitPrice: 31.0, unitsInStock: 31, discontinued: false },
  ];

  constructor(client: VystaClient) {
    super(client, "MockDb", "Products", { primaryKey: "productId" });
  }

  async getPage(params: any): Promise<{ items: Product[]; totalCount: number }> {
    // Mock implementation of getPage for demo purposes
    return { items: this.products, totalCount: this.products.length };
  }
}

export const DataGridDemo = () => {
  // Create a mocked service for demo purposes
  const productService = useMemo(() => {
    const client = new VystaClient({ baseUrl: "http://localhost:8080" });
    return new MockProductService(client);
  }, []);

  // Define column definitions - using correct typing
  const columnDefs = [
    { field: "productId" as keyof Product, headerName: "ID", width: 70 },
    { field: "productName" as keyof Product, headerName: "Name", width: 250 },
    { field: "unitPrice" as keyof Product, headerName: "Price", width: 100 },
    { field: "unitsInStock" as keyof Product, headerName: "Stock", width: 100 },
    { field: "discontinued" as keyof Product, headerName: "Discontinued", width: 120 },
  ];

  const code = `import { DataGrid } from '@datavysta/vysta-react';
import { VystaClient, VystaService } from '@datavysta/vysta-client';
import { useMemo } from 'react';

// Define your entity type
interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
  discontinued: boolean;
}

// Create your service
class ProductService extends VystaService<Product> {
  constructor(client: VystaClient) {
    super(client, 'Northwinds', 'Products', {
      primaryKey: 'productId'
    });
  }
}

function ProductList() {
  const products = useMemo(() => {
    const client = new VystaClient({ baseUrl: 'http://localhost:8080' });
    return new ProductService(client);
  }, []);

  const columnDefs = [
    { field: 'productId', headerName: 'ID' },
    { field: 'productName', headerName: 'Name' },
    { field: 'unitPrice', headerName: 'Price' },
    { field: 'unitsInStock', headerName: 'Stock' },
    { field: 'discontinued', headerName: 'Discontinued' }
  ];

  return (
    <DataGrid<Product>
      title="Products"
      noun="Product"
      repository={products}
      columnDefs={columnDefs}
      getRowId={(product) => product.productId.toString()}
    />
  );
}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">DataGrid</h1>
        <p className="text-lg text-muted-foreground">
          A powerful data grid component for displaying and managing data with features like sorting, filtering, and pagination.
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
              <CardTitle>DataGrid Demo</CardTitle>
              <CardDescription>
                A simple DataGrid showing a list of products with mock data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] border rounded-md">
                <DataGrid<Product>
                  title="Products"
                  noun="Product"
                  repository={productService}
                  columnDefs={columnDefs}
                  getRowId={(product) => product.productId.toString()}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>DataGrid Implementation</CardTitle>
              <CardDescription>Example code for implementing DataGrid component</CardDescription>
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
          <li>Infinite scrolling with server-side operations</li>
          <li>Built-in sorting and filtering capabilities</li>
          <li>Customizable columns and cell rendering</li>
          <li>Support for CRUD operations (create, read, update, delete)</li>
          <li>CSV export functionality</li>
          <li>Fully typed with TypeScript</li>
          <li>Integration with AG Grid for advanced features</li>
        </ul>
      </div>
    </div>
  );
};
