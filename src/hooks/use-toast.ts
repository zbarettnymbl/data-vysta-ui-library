
import { useToast as useToastOriginal, toast as toastOriginal } from "@/components/ui/toast";

export const useToast = useToastOriginal;
export const toast = toastOriginal;

export type { ToastActionElement, ToastProps } from "@/components/ui/toast";
