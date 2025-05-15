
import React, { useState } from "react";
import { LazyLoadList } from "@datavysta/vysta-react/mantine";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useVystaClient } from "@datavysta/vysta-react";

// Define Product type
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
};

export function LazyLoadListDemo() {
  const { toast } = useToast();
  const client = useVystaClient();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Mock data for the LazyLoadList
  const mockProducts: Product[] = [
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
    },
    {
      id: "6",
      name: "Laptop Stand",
      description: "Adjustable aluminum laptop stand",
      price: 39.99,
      category: "Accessories",
      inStock: true
    },
    {
      id: "7",
      name: "USB-C Hub",
      description: "7-in-1 USB-C adapter",
      price: 59.99,
      category: "Electronics",
      inStock: false
    },
    {
      id: "8",
      name: "Wireless Headphones",
      description: "Noise-cancelling Bluetooth headphones",
      price: 199.99,
      category: "Audio",
      inStock: true
    },
    {
      id: "9",
      name: "Desk Lamp",
      description: "LED desk lamp with adjustable brightness",
      price: 34.99,
      category: "Lighting",
      inStock: true
    },
    {
      id: "10",
      name: "External SSD",
      description: "1TB portable solid state drive",
      price: 149.99,
      category: "Storage",
      inStock: true
    },
    {
      id: "11",
      name: "Notebook",
      description: "Hardcover ruled notebook",
      price: 12.99,
      category: "Stationery",
      inStock: true
    },
    {
      id: "12",
      name: "Desk Mat",
      description: "Large desk pad/mouse mat",
      price: 24.99,
      category: "Accessories",
      inStock: true
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">LazyLoadList</h1>
        <p className="text-lg text-muted-foreground">A searchable, lazy-loading dropdown list component for efficiently loading data from a Vysta service.</p>
      </div>

      <div className="space-y-4">
        <div className="max-w-md">
          <h2 className="mb-2 text-xl font-semibold">Basic Usage</h2>
          <LazyLoadList<Product> 
            searchable
            label="Select a product"
            placeholder="Search products..."
            displayProperty="name"
            onChange={(product) => {
              setSelectedProduct(product);
              toast({
                title: "Selected Product",
                description: `You selected: ${product?.name || "None"}`,
              });
            }}
            fetchFn={async (search = "") => {
              // In a real application, this would call a Vysta service
              console.log(`Searching for: ${search}`);
              
              // Simulate API request delay
              await new Promise(resolve => setTimeout(resolve, 500));
              
              // Filter products based on search term
              return mockProducts.filter(product => 
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
              );
            }}
          />
        </div>
        
        <div className="mt-4">
          {selectedProduct && (
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">{selectedProduct.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-medium">${selectedProduct.price.toFixed(2)}</span>
                <span className={`text-sm ${selectedProduct.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
