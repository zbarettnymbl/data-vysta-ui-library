
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon } from "lucide-react";
import DemoWrapper from "@/components/DemoWrapper";

export function FilterPanelDemo() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  
  const handleApplyFilters = () => {
    const newFilters = [];
    
    if (searchTerm) {
      newFilters.push(`Search: ${searchTerm}`);
    }
    
    if (category) {
      newFilters.push(`Category: ${category}`);
    }
    
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      newFilters.push(`Price: $${priceRange[0]} - $${priceRange[1]}`);
    }
    
    setFilters(newFilters);
  };
  
  const handleResetFilters = () => {
    setSearchTerm("");
    setCategory("");
    setPriceRange([0, 1000]);
    setFilters([]);
  };
  
  return (
    <DemoWrapper title="Filter Panel" description="Advanced filtering interface">
      <div className="space-y-6">
        <div className="text-foreground">
          <h3 className="text-xl font-medium">Product Filters</h3>
          <p className="text-muted-foreground mt-2">
            Use filters to narrow down your search results.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-foreground">Search</Label>
              <Input 
                id="search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter keywords..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category-select" className="text-foreground">Category</Label>
              <Select
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-foreground">Price Range</Label>
              <div className="pt-4 px-2">
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={setPriceRange}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                Reset
              </Button>
              <Button size="sm" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-foreground font-medium">Results</div>
            
            {filters.length > 0 ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {filter}
                      <XIcon className="h-3 w-3 cursor-pointer" />
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2 border-t pt-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium text-foreground">Sample Result {item}</div>
                        <div className="text-sm text-muted-foreground">Description for result item {item}</div>
                      </div>
                      <CheckIcon className="h-5 w-5 text-primary" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border rounded-md p-8 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>No filters applied</p>
                  <p className="text-sm">Use the filter panel to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DemoWrapper>
  );
}
