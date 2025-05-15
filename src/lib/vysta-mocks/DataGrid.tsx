
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from "@/components/ui/input";

export interface DataGridProps<TItem, TSelected = TItem> {
  data: TItem[];
  uniqueIdProperty: string;
  columns: {
    id: string;
    header: string;
    accessor: (item: TItem) => React.ReactNode;
    sortable?: boolean;
  }[];
  selectionMode?: 'single' | 'multiple' | 'none';
  onSelectionChange?: (selectedItems: TSelected[]) => void;
  pagination?: {
    pageSize: number;
    totalRecords: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
  };
  searchable?: boolean;
  sortable?: boolean;
}

export function DataGrid<TItem extends Record<string, any>, TSelected = TItem>({
  data,
  uniqueIdProperty,
  columns,
  selectionMode = 'none',
  onSelectionChange,
  pagination,
  searchable = false,
  sortable = false,
}: DataGridProps<TItem, TSelected>) {
  const [selected, setSelected] = React.useState<TItem[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Handle selection
  const handleSelection = (item: TItem) => {
    let newSelection: TItem[];
    
    if (selectionMode === 'single') {
      newSelection = [item];
    } else if (selectionMode === 'multiple') {
      const isSelected = selected.some(selectedItem => 
        selectedItem[uniqueIdProperty] === item[uniqueIdProperty]
      );
      
      if (isSelected) {
        newSelection = selected.filter(selectedItem => 
          selectedItem[uniqueIdProperty] !== item[uniqueIdProperty]
        );
      } else {
        newSelection = [...selected, item];
      }
    } else {
      newSelection = [];
    }
    
    setSelected(newSelection);
    
    if (onSelectionChange) {
      onSelectionChange(newSelection as unknown as TSelected[]);
    }
  };

  // Handle sorting
  const handleSort = (columnId: string) => {
    if (!sortable) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key: columnId, direction });
  };

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item => {
      return columns.some(column => {
        const value = column.accessor(item);
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const column = columns.find(col => col.id === sortConfig.key);
      if (!column) return 0;
      
      const aValue = column.accessor(a);
      const bValue = column.accessor(b);
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortConfig.direction === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
      
      return 0;
    });
  }, [filteredData, sortConfig, columns]);

  // Check if an item is selected
  const isSelected = (item: TItem) => {
    return selected.some(selectedItem => 
      selectedItem[uniqueIdProperty] === item[uniqueIdProperty]
    );
  };

  return (
    <div className="space-y-4">
      {searchable && (
        <div>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      
      <div className="rounded-md border">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.id}
                  onClick={() => sortable && handleSort(column.id)}
                  className={sortable ? "cursor-pointer" : ""}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {sortable && sortConfig && sortConfig.key === column.id && (
                      sortConfig.direction === 'asc' 
                        ? <ChevronUp className="h-4 w-4" />
                        : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow 
                key={item[uniqueIdProperty]}
                onClick={() => selectionMode !== 'none' && handleSelection(item)}
                className={`${selectionMode !== 'none' ? 'cursor-pointer' : ''} ${
                  isSelected(item) ? 'bg-muted/50' : ''
                }`}
              >
                {columns.map((column) => (
                  <TableCell key={`${item[uniqueIdProperty]}-${column.id}`}>
                    {column.accessor(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {pagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <span className="text-sm text-muted-foreground">
            Showing {Math.min(pagination.pageSize, sortedData.length)} of {pagination.totalRecords} entries
          </span>
        </div>
      )}
    </div>
  );
}
