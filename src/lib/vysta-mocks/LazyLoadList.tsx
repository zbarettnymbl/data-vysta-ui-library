
import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export interface LazyLoadListProps<T> {
  searchable?: boolean;
  label?: string;
  placeholder?: string;
  displayProperty: string;
  onChange: (selectedItem: T | null) => void;
  fetchFn: (search?: string) => Promise<T[]>;
  initialValue?: T | null;
}

export function LazyLoadList<T extends Record<string, any>>({
  searchable = false,
  label,
  placeholder = "Select an item...",
  displayProperty,
  onChange,
  fetchFn,
  initialValue = null,
}: LazyLoadListProps<T>) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(initialValue);

  useEffect(() => {
    if (open) {
      loadItems();
    }
  }, [open, search]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const results = await fetchFn(search);
      setItems(results);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    onChange(item);
    setOpen(false);
  };

  const handleClear = () => {
    setSelectedItem(null);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedItem
              ? selectedItem[displayProperty]
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            {searchable && (
              <CommandInput
                placeholder="Search..."
                value={search}
                onValueChange={setSearch}
              />
            )}
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {items.map((item, index) => (
                    <CommandItem
                      key={index}
                      value={item[displayProperty]}
                      onSelect={() => handleSelect(item)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedItem && selectedItem[displayProperty] === item[displayProperty]
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item[displayProperty]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
