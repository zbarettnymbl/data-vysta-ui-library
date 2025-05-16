import { DataGridStyles } from "@datavysta/vysta-react";
import { CSSProperties } from "react";

/**
 * Custom hook for applying theme-aware styles to Vysta components
 * Uses CSS variables to automatically respond to dark mode
 */
export const useVystaStyles = () => {
  // DataGrid styles using CSS variables
  const dataGridStyles: DataGridStyles = {
    container: {
      backgroundColor: "var(--vysta-datagrid-bg)",
      border: "1px solid var(--vysta-datagrid-border)",
    },
    toolbar: {
      backgroundColor: "var(--vysta-datagrid-toolbar-bg)",
      borderBottom: "1px solid var(--vysta-datagrid-border)",
    },
    title: {
      color: "var(--vysta-datagrid-title)",
    },
    badge: {
      backgroundColor: "var(--vysta-datagrid-badge-bg)",
      color: "var(--vysta-datagrid-badge-text)",
      borderRadius: "12px",
      padding: "4px 12px",
      fontWeight: 500,
    },
    grid: {
      // Custom grid styles if needed
    },
    createButton: {
      backgroundColor: "var(--vysta-datagrid-create-button-bg)",
      color: "var(--vysta-datagrid-create-button-text)",
    },
    deleteButton: {
      backgroundColor: "var(--vysta-datagrid-delete-button-bg)",
      color: "var(--vysta-datagrid-delete-button-text)",
    },
    downloadButton: {
      backgroundColor: "var(--vysta-datagrid-download-button-bg)",
      color: "var(--vysta-datagrid-download-button-text)",
    },
    // Additional properties can be added as needed
  };

  // FilterPanel styles
  const filterPanelStyles: Record<string, CSSProperties> = {
    container: {
      backgroundColor: "var(--vysta-filterpanel-bg)",
      border: "1px solid var(--vysta-filterpanel-border)",
      color: "var(--vysta-filterpanel-text)",
    },
    title: {
      color: "var(--vysta-filterpanel-title)",
      fontWeight: 500,
    },
    input: {
      backgroundColor: "var(--vysta-filterpanel-input-bg)",
      color: "var(--vysta-filterpanel-input-text)",
      border: "1px solid var(--vysta-filterpanel-input-border)",
    },
    select: {
      backgroundColor: "var(--vysta-filterpanel-input-bg)",
      color: "var(--vysta-filterpanel-input-text)",
      border: "1px solid var(--vysta-filterpanel-input-border)",
    },
    button: {
      backgroundColor: "var(--vysta-filterpanel-button-bg)",
      color: "var(--vysta-filterpanel-button-text)",
    },
  };

  // LazyLoadList styles
  const lazyLoadListStyles: Record<string, CSSProperties> = {
    container: {
      backgroundColor: "var(--vysta-lazyloadlist-bg)",
      border: "1px solid var(--vysta-lazyloadlist-border)",
      color: "var(--vysta-lazyloadlist-text)",
    },
    option: {
      backgroundColor: "var(--vysta-lazyloadlist-option-bg)",
      color: "var(--vysta-lazyloadlist-text)",
    },
    selectedOption: {
      backgroundColor: "var(--vysta-lazyloadlist-option-selected)",
    },
    input: {
      backgroundColor: "var(--vysta-lazyloadlist-input-bg)",
      color: "var(--vysta-lazyloadlist-input-text)",
      border: "1px solid var(--vysta-lazyloadlist-input-border)",
    },
  };

  return {
    dataGridStyles,
    filterPanelStyles,
    lazyLoadListStyles,
    // You can add more component styles here as needed
  };
};
