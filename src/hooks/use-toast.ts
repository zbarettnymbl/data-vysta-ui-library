
import { useToast as useToastOriginal, toast as toastOriginal, type ToastActionElement, type ToastProps } from "@/components/ui/toast";

export const useToast = useToastOriginal;
export const toast = toastOriginal;

export type { ToastActionElement, ToastProps };
