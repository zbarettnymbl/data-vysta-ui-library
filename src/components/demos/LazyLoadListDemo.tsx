
import React, { useState, useMemo } from "react";
import { LazyLoadList } from "@datavysta/vysta-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DemoWrapper from "@/components/DemoWrapper";

// Define User interface
interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  avatar: string;
}

// Mock data service for LazyLoadList
class UserService {
  private generateItems = (start: number, end: number) => {
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

  async search(term?: string, page: number = 0, pageSize: number = 20) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate mock data
    const items = this.generateItems(0, 50);
    
    // Filter by search term if provided
    const filteredItems = term 
      ? items.filter(item => 
          item.name.toLowerCase().includes(term.toLowerCase()) ||
          item.email.toLowerCase().includes(term.toLowerCase())
        )
      : items;
      
    const paginatedItems = filteredItems.slice(page * pageSize, (page + 1) * pageSize);
    
    return {
      data: paginatedItems,
      total: filteredItems.length
    };
  }

  // Required methods for a data service
  async getById(id: string) {
    const allItems = this.generateItems(0, 50);
    const item = allItems.find(i => i.id === id);
    return { data: item || null };
  }
}

export function LazyLoadListDemo() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Create a memoized instance of our service
  const userService = useMemo(() => new UserService(), []);

  // Custom item renderer
  const renderUserItem = (user: User) => (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-foreground">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      </div>
      <Badge 
        variant={
          user.status === "active" ? "default" : 
          user.status === "away" ? "outline" : "secondary"
        }
      >
        {user.status}
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
          <LazyLoadList<User>
            repository={userService}
            renderItem={renderUserItem}
            searchField="name"
            getItemId={(user) => user.id}
            placeholder="Search users..."
          />
        </div>
      </div>
    </DemoWrapper>
  );
}
