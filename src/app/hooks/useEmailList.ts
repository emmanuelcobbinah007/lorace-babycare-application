import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getEmailList, deleteEmail, EmailListItem } from '../api/email-list/emailListApi';

// Hook to get email list
export const useEmailList = () => {
  return useQuery({
    queryKey: ['emailList'],
    queryFn: getEmailList,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to delete an email
export const useDeleteEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmail,
    onSuccess: (deletedEmail) => {
      // Update the cache by removing the deleted email
      queryClient.setQueryData(['emailList'], (oldData: EmailListItem[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(email => email.id !== deletedEmail.id);
      });
      
      toast.success('Email deleted successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      console.error('Error deleting email:', error);
      toast.error('Failed to delete email', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};
