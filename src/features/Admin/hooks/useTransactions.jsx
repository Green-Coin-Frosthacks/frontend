import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../services/admin.service";

const useTransactions = () => {
  const [filters, setFilters] = useState({
    uid: "",
    status: "",
    type: "",
    date: "",
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["adminTransactions", filters],
    queryFn: () => getAllTransactions(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ uid: "", status: "", type: "", date: "" });
  };

  return {
    transactions: data?.transactions || [],
    count: data?.count || 0,
    isLoading,
    isError,
    error,
    filters,
    updateFilter,
    clearFilters,
    refetch,
  };
};

export default useTransactions;
