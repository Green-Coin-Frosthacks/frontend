import { useQueries } from "@tanstack/react-query";
import {
  getWalletBalance,
  getProductsById,
  getMyweeklyAnalytics,
} from "../services/user.service";
import useAuth from "../../Auth/hooks/useAuth";

const FIVE_MIN = 1000 * 60 * 5;

const useUser = (productId) => {
  const { user } = useAuth();

  const results = useQueries({
    queries: [
      {
        queryKey: ["walletBalance"],
        queryFn: getWalletBalance,
        enabled: !!user, 
        staleTime: FIVE_MIN,
        retry: 1,
      },
      {
        queryKey: ["myWeeklyAnalytics"],
        queryFn: getMyweeklyAnalytics,
        enabled: !!user,
        staleTime: FIVE_MIN,
        retry: 1,
      },
      {
        queryKey: ["product", productId],
        queryFn: () => getProductsById(productId),
        enabled: !!productId, 
        staleTime: FIVE_MIN,
        retry: 1,
      },
    ],
  });

  const [
    walletQuery,
    weeklyAnalyticsQuery,
    productQuery,
  ] = results;

  return {
    // Data
    walletBalance: walletQuery.data,
    weeklyAnalytics: weeklyAnalyticsQuery.data?.data,
    product: productQuery.data?.product,

    // Global states
    isLoading: results.some((q) => q.isLoading),
    isError: results.some((q) => q.isError),
    error: results.find((q) => q.error)?.error,

    // Individual queries (for flexibility)
    queries: {
      wallet: walletQuery,
      weeklyAnalytics: weeklyAnalyticsQuery,
      product: productQuery,
    },
  };
};

export default useUser;