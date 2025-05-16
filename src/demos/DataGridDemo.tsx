import DemoWrapper from "@/components/DemoWrapper";
import { useVystaStyles } from "@/hooks/use-vysta-styles";
import { DataGrid } from "@datavysta/vysta-react";
import { Badge, Box, Button, Group, Text, Title } from "@mantine/core";
import { useMemo, useState } from "react";

// Import from our mock service architecture
import { MockServiceFactory, Product } from "@/lib/vysta-mocks";
import { DataResult } from "@/lib/vysta-mocks/types";

// Define a value formatter params interface
interface ValueFormatterParams {
  value: number;
}

// Define interface for the QueryParams expected by DataGrid
interface QueryParams<T> {
  // Add any properties needed for querying
  filters?: Record<string, unknown>;
  sort?: Array<{ field: keyof T | string; sort: "asc" | "desc" }>;
  page?: number;
  pageSize?: number;
  q?: string;
}

// Define the interface expected by DataGrid
interface IReadonlyDataService<TEntity, TQuery> {
  getAll(params?: TQuery): Promise<DataResult<TEntity>>;
  getById(
    id: string,
    params?: TQuery
  ): Promise<{ data: TEntity | null; error: Error | null }>;
  query(params: TQuery): Promise<DataResult<TEntity>>;
  download(params?: TQuery): Promise<Blob>;
}

export function DataGridDemo() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // Get our theme-aware styles
  const { dataGridStyles } = useVystaStyles();

  // Get a ProductService instance from the factory
  const productService = useMemo(() => {
    const factory = MockServiceFactory.getInstance({
      networkConfig: {
        defaultDelay: 300, // 300ms delay to simulate network latency
        simulateJitter: true,
      },
    });
    return factory.getProductService();
  }, []);

  // Create an adapter that converts from the expected interface to our actual implementation
  const productServiceAdapter = useMemo(() => {
    return {
      getAll: (params?: QueryParams<Product>) => {
        // Convert params to NetworkOptions if needed
        return productService.getAll();
      },
      getById: (id: string, params?: QueryParams<Product>) => {
        // Convert params to NetworkOptions if needed
        return productService.getById(id);
      },
      query: (params: QueryParams<Product>) => {
        // Map the params to the format expected by our service
        return productService.query(params);
      },
      download: (params?: QueryParams<Product>) => {
        return productService.download();
      },
    } as IReadonlyDataService<Product, QueryParams<Product>>;
  }, [productService]);

  // Column definitions
  const columnDefs = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "category", headerName: "Category", width: 120 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      valueFormatter: (params: ValueFormatterParams) => `$${params.value}`,
    },
    { field: "stock", headerName: "Stock", width: 80 },
  ];

  // Selection change handler
  const handleSelectionChange = (selectedRows: Product[]) => {
    setSelectedItems(selectedRows.map((row: Product) => row.id));
  };

  return (
    <DemoWrapper title="DataGrid" description="Interactive data grid component">
      <Box className="space-y-6">
        <div>
          <Title order={3} size="xl" fw={500}>
            Product Inventory
          </Title>
          <Text c="dimmed" mt="xs">
            Manage your product catalog with advanced filtering and sorting.
          </Text>
        </div>

        <Box className="space-y-4">
          {selectedItems.length > 0 && (
            <Group gap="xs">
              <Badge variant="light" color="gray">
                {selectedItems.length} selected
              </Badge>
              <Button
                variant="outline"
                size="xs"
                onClick={() => setSelectedItems([])}
              >
                Clear Selection
              </Button>
            </Group>
          )}

          <Box h={384} className="border rounded-md">
            <DataGrid<Product>
              title="Products"
              noun="Product"
              repository={productServiceAdapter}
              columnDefs={columnDefs}
              getRowId={(product) => product.id}
              onDataLoaded={(_, data) => {
                console.log(`Loaded ${data.length} products`);
              }}
              // Apply our theme-aware styles here
              styles={dataGridStyles}
            />
          </Box>
        </Box>
      </Box>
    </DemoWrapper>
  );
}
