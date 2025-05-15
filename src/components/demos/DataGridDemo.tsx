
import React, { useState } from "react";
import { DataGrid } from "@/lib/vysta-mocks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DemoWrapper from "@/components/DemoWrapper";

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

  // Column definitions - updated to match the DataGrid interface
  const columns = [
    { 
      id: "name", 
      header: "Name", 
      accessor: (item: any) => item.name 
    },
    { 
      id: "category", 
      header: "Category", 
      accessor: (item: any) => item.category 
    },
    { 
      id: "price", 
      header: "Price", 
      accessor: (item: any) => `$${item.price}` 
    },
    { 
      id: "stock", 
      header: "Stock", 
      accessor: (item: any) => item.stock 
    }
  ];

  const handleSelectionChange = (newSelection: string[]) => {
    setSelectedItems(newSelection);
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
            <DataGrid
              rows={data}
              columns={columns}
              rowIdField="id"
              selectedRows={selectedItems}
              onSelectedRowsChange={handleSelectionChange}
            />
          </div>
        </div>
      </div>
    </DemoWrapper>
  );
}
