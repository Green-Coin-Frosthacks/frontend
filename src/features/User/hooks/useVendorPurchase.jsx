import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseItem } from "../services/vendor.service";

const useVendorPurchase = (onSuccessCallback) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: purchaseItem,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["user", "balance"]);
            if (onSuccessCallback) onSuccessCallback(data);
        },
        onError: (error) => {
            console.error("Backend purchase failed:", error);
            alert(error.response?.data?.error || error.response?.data?.message || "Failed to complete purchase in backend.");
        }
    });
};

export default useVendorPurchase;
