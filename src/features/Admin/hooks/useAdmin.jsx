import { useQueries } from "@tanstack/react-query";
import { getAllDustbins, getAllStudents, getMarketProducts, getNotification, getOverallWeeklyAnalytics, getTotalWeastDeposited, leaderboard } from "../services/admin.service";
import useAuth from "../../Auth/hooks/useAuth";


const FIVE_MIN = 1000 * 60 * 5;

const useAdmin = () => {
  const { user } = useAuth();
  const results = useQueries({
    queries: [
      {
        queryKey: ["dustbins"],
        queryFn: getAllDustbins,
        enabled: user?.role === "admin", 
        staleTime: FIVE_MIN,
        retry: 1,
      },
      {
        queryKey: ["totalWaste"],
        queryFn: getTotalWeastDeposited,
        enabled: user?.role === "admin", 
        staleTime: FIVE_MIN,
        retry: 1,
      },
      {
        queryKey: ["students"],
        queryFn: getAllStudents,
        enabled: user?.role === "admin",
        staleTime: FIVE_MIN,
        retry: 1,
      },
      {
        queryKey: ["weeklyAnalytics"],
        queryFn: getOverallWeeklyAnalytics,
        enabled: user?.role === "admin",
        staleTime: FIVE_MIN,
        retry: 1,
      },
      {
        queryKey: ["leaderboard"],
        queryFn: leaderboard,
        staleTime: FIVE_MIN,
        retry: 1,
      },
      {
        queryKey: ["marketProducts"],
        queryFn: getMarketProducts,
        staleTime: FIVE_MIN,
        retry: 1,
      },
      {
        queryKey: ["notifications"],
        queryFn: getNotification,
        enabled: user?.role === "admin",
        staleTime: FIVE_MIN,
        retry: 1,
      }
    ],
  });

  const [
    dustbinsQuery,
    totalWasteQuery,
    studentsQuery,
    weeklyAnalyticsQuery,
    leaderboardQuery,
    marketProductsQuery,
    notificationsQuery
  ] = results;

  return {
    //  Data
    dustbins: dustbinsQuery.data?.dustbins,
    totalWaste: totalWasteQuery.data,
    students: studentsQuery.data?.students,
    weeklyAnalytics: weeklyAnalyticsQuery.data?.data,
    leaderboard: leaderboardQuery.data?.leaderboard,
    marketProducts: marketProductsQuery.data?.products,
    notifications: notificationsQuery.data?.notifications,

    //  Loading state (if ANY query is loading)
    isLoading: results.some((q) => q.isLoading),

    // Error handling
    isError: results.some((q) => q.isError),
    error: results.find((q) => q.error)?.error,

    // Optional: individual query states (useful for advanced UI)
    queries: {
      dustbins: dustbinsQuery,
      totalWaste: totalWasteQuery,
      students: studentsQuery,
      weeklyAnalytics: weeklyAnalyticsQuery,
      marketProducts: marketProductsQuery,
      notifications: notificationsQuery,
    },
  };
};

export default useAdmin;