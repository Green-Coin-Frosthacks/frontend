import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { deleteStudent, getStudentById, promoteToAdmin, updateStudentUID, getUserWeeklyAnalytics } from "../services/admin.service";


function useUserModification(id) {
  const {
    data: student,
    isLoading: isStudentLoading,
    isError: isStudentError,
    error: studentError,
    refetch,
  } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
  } = useQuery({
    queryKey: ["studentAnalytics", id],
    queryFn: () => getUserWeeklyAnalytics(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const [isUpdatingUID, setIsUpdatingUID] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPromoting, setIsPromoting] = useState(false);

  const [actionError, setActionError] = useState(null);


  const updateUID = async (uid) => {
    try {
      setIsUpdatingUID(true);
      setActionError(null);

      const data = await updateStudentUID(id, uid);
      await refetch();

      return data;
    } catch (err) {
      setActionError(err);
    } finally {
      setIsUpdatingUID(false);
    }
  };

  const removeStudent = async () => {
    try {
      setIsDeleting(true);
      setActionError(null);

      const data = await deleteStudent(id);
      return data;
    } catch (err) {
      setActionError(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const promoteUser = async () => {
    try {
      setIsPromoting(true);
      setActionError(null);

      const data = await promoteToAdmin(id);
      await refetch();

      return data;
    } catch (err) {
      setActionError(err);
    } finally {
      setIsPromoting(false);
    }
  };

  return {
    // student data
    student: student?.student,
    analytics: analyticsData?.data || [],
    isStudentLoading,
    isAnalyticsLoading,
    isStudentError,
    studentError,

    // actions
    updateUID,
    removeStudent,
    promoteUser,

    // loading states
    isUpdatingUID,
    isDeleting,
    isPromoting,

    // error
    actionError,

    // manual refetch
    refetchStudent: refetch,
  };
}

export default useUserModification;