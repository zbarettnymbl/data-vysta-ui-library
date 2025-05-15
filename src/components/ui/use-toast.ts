
import { useToast, toast, type ToastProps } from "@/hooks/use-toast";

export type ToastActionElement = React.ReactElement<{
  onPress: () => void;
}>;

export { useToast, toast, type ToastProps, type ToastActionElement };
