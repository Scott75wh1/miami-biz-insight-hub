
import { toast as internalToast } from "@/components/ui/toast";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    internalToast({
      title,
      description,
      variant,
    });
  };
  
  return { toast };
};

export { internalToast as toast } from "@/components/ui/toast";
export type { ToastActionElement } from "@/components/ui/toast";
