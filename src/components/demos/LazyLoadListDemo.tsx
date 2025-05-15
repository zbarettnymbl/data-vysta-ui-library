
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DemoWrapper from "@/components/DemoWrapper";
import { LazyLoadList } from "@/lib/vysta-mocks";

export function LazyLoadListDemo() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Sample data generator function
  const generateItems = (start: number, end: number) => {
    return Array.from({ length: end - start }, (_, i) => {
      const id = start + i;
      return {
        id: `item-${id}`,
        name: `User ${id}`,
        email: `user${id}@example.com`,
        status: id % 3 === 0 ? "active" : id % 3 === 1 ? "away" : "offline",
        avatar: `https://i.pravatar.cc/100?u=${id}`
      };
    });
  };
  
  const renderUserItem = (item: any) => (
    <div className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={item.avatar} alt={item.name} />
          <AvatarFallback>{item.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-foreground">{item.name}</div>
          <div className="text-sm text-muted-foreground">{item.email}</div>
        </div>
      </div>
      <Badge 
        variant={
          item.status === "active" ? "default" : 
          item.status === "away" ? "outline" : "secondary"
        }
      >
        {item.status}
      </Badge>
    </div>
  );
  
  return (
    <DemoWrapper title="LazyLoadList" description="Efficient loading of large lists">
      <div className="space-y-6">
        <div className="text-foreground">
          <h3 className="text-xl font-medium">User Directory</h3>
          <p className="text-muted-foreground mt-2">
            Browse through users with virtual scrolling for optimal performance.
          </p>
        </div>
        
        <div className="border rounded-md h-96 overflow-hidden bg-background">
          <LazyLoadList
            searchable={true}
            displayProperty="name"
            onChange={setSelectedItem}
            fetchFn={async (search?: string) => {
              // Simulate network delay
              await new Promise(resolve => setTimeout(resolve, 300));
              
              // Generate mock data
              const items = generateItems(0, 50);
              
              // Filter by search term if provided
              if (search) {
                return items.filter(item => 
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.email.toLowerCase().includes(search.toLowerCase())
                );
              }
              
              return items;
            }}
            initialValue={null}
            placeholder="Select a user..."
          />
        </div>
      </div>
    </DemoWrapper>
  );
}
