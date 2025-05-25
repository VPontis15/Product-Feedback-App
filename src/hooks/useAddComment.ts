import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../api/supabase';

interface UseAddCommentParams {
  feedback_id: number | undefined;
  slug: string;
  onSuccess?: () => void;
}

interface AddCommentData {
  comment: string;
  parent_comment_id?: number | null;
}

const COMMENT_MAX_LENGTH = 250;

export function useAddComment({
  feedback_id,
  slug,
  onSuccess,
}: UseAddCommentParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      comment,
      parent_comment_id = null,
    }: AddCommentData) => {
      try {
        if (
          comment.length === 0 ||
          comment.length > COMMENT_MAX_LENGTH ||
          !feedback_id
        ) {
          throw new Error(
            `Comment must be between 1 and ${COMMENT_MAX_LENGTH} characters long`
          );
        }

        const { data, error } = await supabase
          .from('comment')
          .insert({ comment, feedback_id, user_id: 2, parent_comment_id })
          .select();

        if (error) {
          throw new Error(error.message || 'Failed to add comment');
        }
        return data;
      } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
      }
    },
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: ['suggestion', slug],
      });
      queryClient.invalidateQueries({
        queryKey: ['suggestion-comment', feedback_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['suggestions'],
      });
    },
  });
}
