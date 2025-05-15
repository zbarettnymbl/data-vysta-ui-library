
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from "@/components/ui/input";

export interface DataGridProps {
  rows: any[];
  columns: { id: string; header: string; accessor: (item: any) => React.ReactNode; sortable?: boolean }[];
  rowIdField: string;
  selectedRows?: string[];
  onSelectedRowsChange?: (selectedItems: string[]) => void;
  searchable?: boolean;
  sortable?: boolean;
}

export function DataGrid({
  rows = [],
  columns = [],
  rowIdField,
  selectedRows = [],
  onSelectedRowsChange,
  searchable = false,
  sortable = false,
}: DataGridProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Handle row selection
  const handleSelection = (rowId: string) => {
    if (!onSelectedRowsChange) return;
    
    let newSelection: string[];
    
    if (selectedRows.includes(rowId)) {
      newSelection = selectedRows.filter(id => id !== rowId);
    } else {
      newSelection = [...selectedRows, rowId];
    }
    
    onSelectedRowsChange(newSelection);
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
    if (!searchTerm || !rows) return rows || [];
    
    return rows.filter(item => {
      return columns.some(column => {
        const value = column.accessor(item);
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });
  }, [rows, searchTerm, columns]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig || !filteredData) return filteredData;
    
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

  // Check if a row is selected
  const isSelected = (rowId: string) => {
    return selectedRows?.includes(rowId);
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
            {sortedData && sortedData.map((item) => (
              <TableRow 
                key={item[rowIdField]}
                onClick={() => onSelectedRowsChange && handleSelection(item[rowIdField])}
                className={`${onSelectedRowsChange ? 'cursor-pointer' : ''} ${
                  isSelected(item[rowIdField]) ? 'bg-muted/50' : ''
                }`}
              >
                {columns.map((column) => (
                  <TableCell key={`${item[rowIdField]}-${column.id}`}>
                    {column.accessor(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
