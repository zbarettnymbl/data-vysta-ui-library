
import React from "react";
import { LazyLoadList } from "@/lib/vysta-mocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DemoWrapper from "@/components/DemoWrapper";

export function LazyLoadListDemo() {
  // Sample data generator
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
  
  const renderItem = (item: any) => (
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
            totalItems={1000}
            loadMoreItems={(startIndex, stopIndex) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(generateItems(startIndex, stopIndex));
                }, 300);
              });
            }}
            renderItem={renderItem}
            itemHeight={70}
          />
        </div>
      </div>
    </DemoWrapper>
  );
}
