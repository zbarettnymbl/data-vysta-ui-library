import React, { useState, useMemo } from "react";
import { DataGrid } from "@datavysta/vysta-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DemoWrapper from "@/components/DemoWrapper";
import { VystaClient } from "@datavysta/vysta-client";
import { useVystaClient } from "@/lib/vysta-mocks/useVystaClient";

// Define a proper interface for our product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// Mock VystaService implementation
class ProductService {
  private data: Product[];
  
  constructor(data: Product[]) {
    this.data = data;
  }
  
  // Basic implementation of a repository interface
  async getAll() {
    return { data: this.data, total: this.data.length };
  }

  // Other required methods for IDataService
  async getById(id: string) {
    const item = this.data.find(item => item.id === id);
    return item ? { data: item } : { data: null };
  }

  // Mock implementations for other methods
  async create() { return { success: true, data: null }; }
  async update() { return { success: true, data: null }; }
  async delete() { return { success: true, data: null }; }
}

export function DataGridDemo() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Sample data
  const data = [
    { id: "1", name: "Product A", category: "Electronics", price: 499.99, stock: 25 },
    { id: "2", name: "Product B", category: "Furniture", price: 199.50, stock: 12 },
    { id: "3", name: "Product C", category: "Electronics", price: 299.99, stock: 8 },
    { id: "4", name: "Product D", category: "Clothing", price: 59.99, stock: 42 },
    { id: "5", name: "Product E", category: "Accessories", price: 29.99, stock: 65 },
  ];

  // Create a product service instance with our data
  const productService = useMemo(() => new ProductService(data), []);

  // Column definitions - updated to match the DataGrid interface from VystaReact
  const columnDefs = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'price', headerName: 'Price', width: 100, valueFormatter: (params: any) => `$${params.value}` },
    { field: 'stock', headerName: 'Stock', width: 80 }
  ];

  const handleSelectionChange = (newSelection: any) => {
    if (newSelection && newSelection.api) {
      const selectedRows = newSelection.api.getSelectedRows();
      setSelectedItems(selectedRows.map((row: Product) => row.id));
    }
  };

  return (
    <DemoWrapper title="DataGrid" description="Interactive data grid component">
      <div className="space-y-6">
        <div className="text-foreground">
          <h3 className="text-xl font-medium">Product Inventory</h3>
          <p className="text-muted-foreground mt-2">
            Manage your product catalog with advanced filtering and sorting.
          </p>
        </div>

        <div className="space-y-4">
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{selectedItems.length} selected</Badge>
              <Button variant="outline" size="sm" onClick={() => setSelectedItems([])}>
                Clear Selection
              </Button>
            </div>
          )}

          <div className="h-96 border rounded-md bg-background">
            <DataGrid<Product>
              title="Products"
              noun="Product"
              repository={productService}
              columnDefs={columnDefs}
              getRowId={(product) => product.id}
              onRowSelected={handleSelectionChange}
            />
          </div>
        </div>
      </div>
    </DemoWrapper>
  );
}
