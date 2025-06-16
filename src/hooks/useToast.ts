import { useToastContext } from "@/components/UI/ToastProvider";

export const useToast = () => {
  const { addToast } = useToastContext();
  return { toast: addToast };
};
