
import React, { useState } from "react";
import { DataGrid } from "@datavysta/vysta-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

// Define Product type
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
};

export function DataGridDemo() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Sample data for the DataGrid
  const products: Product[] = [
    {
      id: "1",
      name: "Ergonomic Chair",
      description: "Office chair with lumbar support",
      price: 249.99,
      category: "Furniture",
      inStock: true
    },
    {
      id: "2",
      name: "Mechanical Keyboard",
      description: "RGB backlit mechanical keyboard",
      price: 129.99,
      category: "Electronics",
      inStock: true
    },
    {
      id: "3",
      name: "Ultra-wide Monitor",
      description: "34-inch curved ultrawide display",
      price: 499.99,
      category: "Electronics",
      inStock: false
    },
    {
      id: "4",
      name: "Standing Desk",
      description: "Motorized adjustable height desk",
      price: 399.99,
      category: "Furniture",
      inStock: true
    },
    {
      id: "5",
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      price: 49.99,
      category: "Electronics",
      inStock: true
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">DataGrid</h1>
        <p className="text-lg text-muted-foreground">A feature-rich data grid component for displaying and interacting with tabular data.</p>
      </div>
      
      <div>
        <h2 className="mb-4 text-xl font-semibold">Basic Usage</h2>
        
        {selectedProducts.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedProducts.map((product) => (
              <Badge key={product.id} variant="outline">
                {product.name}
              </Badge>
            ))}
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedProducts([])}
            >
              Clear Selection ({selectedProducts.length})
            </Button>
          </div>
        )}

        <DataGrid<Product>
          data={products}
          uniqueIdProperty="id"
          columns={[
            {
              id: "name",
              header: "Product",
              accessor: (item) => item.name,
            },
            {
              id: "price",
              header: "Price",
              accessor: (item) => `$${item.price.toFixed(2)}`,
            },
            {
              id: "category",
              header: "Category",
              accessor: (item) => (
                <Badge variant="outline">{item.category}</Badge>
              ),
            },
            {
              id: "inStock",
              header: "In Stock",
              accessor: (item) => (
                <div className="flex justify-center">
                  {item.inStock ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              ),
            },
          ]}
          selectionMode="multiple"
          onSelectionChange={setSelectedProducts}
          pagination={{
            pageSize: 5,
            totalRecords: products.length,
          }}
          searchable
          sortable
        />
      </div>
    </div>
  );
}
