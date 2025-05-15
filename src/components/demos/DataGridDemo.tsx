
import React, { useState, useMemo } from "react";
import { DataGrid } from "@datavysta/vysta-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DemoWrapper from "@/components/DemoWrapper";
import { useVystaClient } from "@/lib/vysta-mocks/useVystaClient";

// Define a proper interface for our product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// Updated ProductService class that implements all required methods
class ProductService {
  private data: Product[];
  
  constructor(data: Product[]) {
    this.data = data;
  }
  
  // Basic implementation of a repository interface
  async getAll() {
    return { data: this.data, total: this.data.length };
  }

  async getById(id: string) {
    const item = this.data.find(item => item.id === id);
    return { data: item || null };
  }

  // Required method for IReadonlyDataService
  async query(options: any = {}) {
    const { filters, sort, page = 0, pageSize = 20 } = options;
    
    // Apply any filters
    let filteredData = [...this.data];
    
    if (filters) {
      // Simple filtering implementation
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          filteredData = filteredData.filter(item => 
            String(item[key as keyof Product]).toLowerCase().includes(String(value).toLowerCase())
          );
        }
      });
    }
    
    // Apply sorting
    if (sort && sort.length > 0) {
      const { field, sort: direction } = sort[0];
      filteredData.sort((a, b) => {
        const aValue = a[field as keyof Product];
        const bValue = b[field as keyof Product];
        
        if (direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    // Apply pagination
    const paginatedData = filteredData.slice(page * pageSize, (page + 1) * pageSize);
    
    return { 
      data: paginatedData,
      total: filteredData.length,
      page,
      pageSize,
      pageCount: Math.ceil(filteredData.length / pageSize)
    };
  }

  // Required method for IReadonlyDataService
  async download() {
    // Mock implementation
    return { data: new Blob(['mock data'], { type: 'text/plain' }), filename: 'products.csv' };
  }
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

  // Updated column definitions to match ColDef<Product, any>
  const columnDefs = [
    { field: 'name' as const, headerName: 'Name', width: 150 },
    { field: 'category' as const, headerName: 'Category', width: 120 },
    { field: 'price' as const, headerName: 'Price', width: 100, valueFormatter: (params: any) => `$${params.value}` },
    { field: 'stock' as const, headerName: 'Stock', width: 80 }
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
