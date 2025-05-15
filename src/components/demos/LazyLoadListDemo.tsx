
import { useMemo, useState } from "react";
import { LazyLoadList } from "@datavysta/vysta-react";
import { VystaClient, VystaService } from "@datavysta/vysta-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "../CodeBlock";

// Define product type
interface Product {
  productId: number;
  productName: string;
  categoryName: string;
}

// Mock service for demo purposes
class MockProductService extends VystaService<Product> {
  private products: Product[] = [
    { productId: 1, productName: "Chai", categoryName: "Beverages" },
    { productId: 2, productName: "Chang", categoryName: "Beverages" },
    { productId: 3, productName: "Aniseed Syrup", categoryName: "Condiments" },
    { productId: 4, productName: "Chef Anton's Cajun Seasoning", categoryName: "Condiments" },
    { productId: 5, productName: "Chef Anton's Gumbo Mix", categoryName: "Condiments" },
    { productId: 6, productName: "Grandma's Boysenberry Spread", categoryName: "Condiments" },
    { productId: 7, productName: "Uncle Bob's Organic Dried Pears", categoryName: "Produce" },
    { productId: 8, productName: "Northwoods Cranberry Sauce", categoryName: "Condiments" },
    { productId: 9, productName: "Mishi Kobe Niku", categoryName: "Meat/Poultry" },
    { productId: 10, productName: "Ikura", categoryName: "Seafood" },
    { productId: 11, productName: "Queso Cabrales", categoryName: "Dairy Products" },
    { productId: 12, productName: "Queso Manchego La Pastora", categoryName: "Dairy Products" },
  ];

  constructor(client: VystaClient) {
    super(client, "MockDb", "Products", { primaryKey: "productId" });
  }

  async getPage(params: any): Promise<{ items: Product[]; totalCount: number }> {
    let filteredProducts = [...this.products];
    
    // Handle search term if provided
    if (params.q) {
      const searchTerm = params.q.toLowerCase();
      filteredProducts = filteredProducts.filter(
        p => p.productName.toLowerCase().includes(searchTerm)
      );
    }
    
    // Handle filters if provided
    if (params.filters?.categoryName?.eq) {
      filteredProducts = filteredProducts.filter(
        p => p.categoryName === params.filters.categoryName.eq
      );
    }
    
    return { 
      items: filteredProducts.slice(0, params.pageSize || 10),
      totalCount: filteredProducts.length 
    };
  }
  
  async getById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.productId.toString() === id);
    return product || null;
  }
}

export const LazyLoadListDemo = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Create a mocked service for demo purposes
  const productService = useMemo(() => {
    const client = new VystaClient({ baseUrl: "http://localhost:8080" });
    return new MockProductService(client);
  }, []);
  
  // Create filters based on selected category
  const filters = useMemo(() => {
    if (!selectedCategory) return undefined;
    return { categoryName: { eq: selectedCategory } };
  }, [selectedCategory]);

  const code = `import { LazyLoadList } from '@datavysta/vysta-react';
import { VystaClient, VystaService } from '@datavysta/vysta-client';
import { useMemo, useState } from 'react';

// Define your entity type
interface Product {
  productId: number;
  productName: string;
  categoryName: string;
}

// Create your service
class ProductService extends VystaService<Product> {
  constructor(client: VystaClient) {
    super(client, 'Northwinds', 'Products', {
      primaryKey: 'productId'
    });
  }
}

function ProductSelector() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const productService = useMemo(() => {
    const client = new VystaClient({ baseUrl: 'http://localhost:8080' });
    return new ProductService(client);
  }, []);
  
  // Create filters based on selected category
  const filters = useMemo(() => {
    if (!selectedCategory) return undefined;
    return { categoryName: { eq: selectedCategory } };
  }, [selectedCategory]);

  return (
    <LazyLoadList<Product>
      repository={productService}
      value={selectedProductId}
      onChange={setSelectedProductId}
      label="Select Product"
      displayColumn="productName"
      clearable
      filters={filters}
      groupBy="categoryName"
    />
  );
}`;

  // List of categories for the demo
  const categories = [
    "Beverages", 
    "Condiments", 
    "Confections", 
    "Dairy Products", 
    "Grains/Cereals", 
    "Meat/Poultry", 
    "Produce", 
    "Seafood"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">LazyLoadList</h1>
        <p className="text-lg text-muted-foreground">
          A searchable, lazy-loading dropdown list component for efficiently loading data from a Vysta service.
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
              <CardTitle>LazyLoadList Demo</CardTitle>
              <CardDescription>
                A dropdown with searchable, lazy-loaded products that can be filtered by category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Filter by Category:</h3>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Select Product:</h3>
                <LazyLoadList<Product>
                  repository={productService}
                  value={selectedProductId}
                  onChange={setSelectedProductId}
                  label="Select Product"
                  displayColumn="productName"
                  clearable
                  filters={filters}
                  groupBy="categoryName"
                />
              </div>
              
              {selectedProductId && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p>Selected Product ID: <strong>{selectedProductId}</strong></p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>LazyLoadList Implementation</CardTitle>
              <CardDescription>Example code for implementing LazyLoadList component</CardDescription>
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
          <li>Lazy loading with infinite scroll</li>
          <li>Built-in search functionality</li>
          <li>Optional grouping of items</li>
          <li>Efficient loading of selected values</li>
          <li>Support for filtering</li>
          <li>Full TypeScript support</li>
        </ul>
      </div>
    </div>
  );
};
