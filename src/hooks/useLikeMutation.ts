import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface UseLikeMutationProps {
  suggestionId: string;
  suggestionSlug?: string;
}

export function useLikeMutation({
  suggestionId,
  suggestionSlug,
}: UseLikeMutationProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Check if the current user has liked this suggestion
  const { data: userLiked = false, isLoading: isCheckingLiked } = useQuery({
    queryKey: ['userLiked', suggestionId, user?.id],
    queryFn: async () => {
      if (!user?.id) return false;

      // First, let's try a simpler query to see if the table is accessible
      const { error: allLikesError } = await supabase
        .from('likes')
        .select('*')
        .limit(1);

      if (allLikesError) {
        console.error('Error accessing likes table:', allLikesError);
        return false;
      }

      const { data: userLiked, error } = await supabase
        .from('likes')
        .select('id')
        .eq('feedback_id', suggestionId)
        .eq('user_id', user.id)
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no rows found

      if (error) {
        console.error('Error fetching user liked status:', error);
        return false;
      }

      return !!userLiked;
    },
    enabled: !!user?.id,
    retry: 1, // Reduce retries to avoid spam
  });

  // Mutation for liking/unliking
  const likeMutation = useMutation({
    mutationFn: async ({ isLiking }: { isLiking: boolean }) => {
      if (!user?.id) throw new Error('User not authenticated');
      if (isLiking) {
        const { error } = await supabase
          .from('likes')
          .insert({ feedback_id: suggestionId, user_id: user.id })
          .select();

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
      } else {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('feedback_id', suggestionId)
          .eq('user_id', user.id)
          .select();

        if (error) {
          console.error('Delete error:', error);
          throw error;
        }
      }
    },
    onSuccess: () => {
      // Invalidate the user liked status
      queryClient.invalidateQueries({
        queryKey: ['userLiked', suggestionId, user?.id],
      });
      // Invalidate the suggestions list (for home page)
      queryClient.invalidateQueries({ queryKey: ['suggestions'] });
      // Invalidate all roadmap-related queries
      queryClient.invalidateQueries({ queryKey: ['roadmap'] });
      queryClient.invalidateQueries({ queryKey: ['roadmapColumn'] });
      queryClient.invalidateQueries({ queryKey: ['roadmap-feedback'] });
      queryClient.invalidateQueries({ queryKey: ['statuses'] });
      // Invalidate the individual suggestion query (for suggestion page) if slug is provided
      if (suggestionSlug) {
        queryClient.invalidateQueries({
          queryKey: ['suggestion', suggestionSlug],
        });
      }
    },
    onError: (error) => {
      console.error('Error toggling like:', error);
    },
  });

  const handleLikeClick = () => {
    if (!user) {
      return;
    }

    likeMutation.mutate({ isLiking: !userLiked });
  };

  return {
    userLiked,
    isCheckingLiked,
    likeMutation,
    handleLikeClick,
    isLoading: likeMutation.isPending,
  };
}
