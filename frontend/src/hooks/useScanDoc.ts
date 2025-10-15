import { scanDocApi } from "@/services/ocrService";
import { useMutation } from "@tanstack/react-query";

export const useScanDoc = () => {
  return useMutation({
    mutationFn: scanDocApi,
  });
};
