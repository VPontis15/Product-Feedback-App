import styled from 'styled-components';
import Button from '../../../components/Button';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import supabase from '../../../api/supabase';

const StyledCommentForm = styled.div<{
  error: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 0 auto;
  h2 {
    color: var(--color-dark-blue);
    font-size: var(--fs-xxl);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;

      span {
        color: ${({ error }) =>
          error ? 'var(--color-red)' : 'var(--color-dark-gray)'}; 
        font-size: var(--fs-md);
        font-weight: ${({ error }) => (error ? '700' : '400')};
      }
    }
 
`;

const StyledTextarea = styled.textarea<{ error: boolean }>`
  border: 1px solid
    ${({ error }) => (error ? 'var(--color-red)' : 'var(--color-dark-blue)')};
  width: 100%;
  height: 100px;
  padding: 1rem;
  border-radius: var(--btn-radius);
  font-size: var(--fs-md);
  resize: vertical;

  &:focus {
    border-color: ${({ error }) =>
      error ? 'var(--color-red)' : 'var(--color-purple)'};
    outline: none;
  }

  &::placeholder {
    font-family: inherit;
  }
}
`;

const ErrorMessage = styled(motion.span)`
  color: var(--color-red);
  position: absolute;
  bottom: 50px;

  @media (max-width: 452px) {
    bottom: 35px;
  }
`;
const COMMENT_MAX_LENGTH = 250;
export default function CommentForm({ slug }: { slug: string }) {
  const [charactersLeft, setCharactersLeft] = useState(COMMENT_MAX_LENGTH);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const remainingChars = COMMENT_MAX_LENGTH - value.length;
    setCharactersLeft(Math.max(0, remainingChars));
    setComment(value);

    if (value.length >= COMMENT_MAX_LENGTH) {
      setError(
        `Comment reached the maximum length of ${COMMENT_MAX_LENGTH} characters`
      );
    } else {
      setError(null);
    }
  };

  const { data: feedback_id } = useQuery({
    queryKey: ['feedbackId', slug],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('feedback')
          .select('id')
          .eq('slug', slug)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        return data.id;
      } catch (error) {
        console.error('Error fetching feedback ID:', error);
        throw error; // Re-throw to let React Query handle it
      }
    },
    enabled: !!slug, // Only run this query if slug is available
    //run only once on mount
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { mutate: addComment, error: insertionError } = useMutation({
    mutationFn: async () => {
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
          .insert({ comment, feedback_id, user_id: 2, parent_comment_id: 8 })
          .select();
        if (error) {
          throw new Error(error.message || 'Failed to add comment');
        }
        return data;
      } catch (error) {
        console.error('Error adding comment:', error);
        throw error; // Re-throw to let React Query handle it
      }
    },
    onSuccess: () => {
      setComment('');
      setCharactersLeft(COMMENT_MAX_LENGTH);
      setError(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.length === 0 || comment.length > COMMENT_MAX_LENGTH) {
      setError(
        `Comment must be between 1 and ${COMMENT_MAX_LENGTH} characters long`
      );
      return;
    }
    addComment();
  };

  return (
    <StyledCommentForm onSubmit={handleSubmit} error={!!error}>
      <h2>Add Comment</h2>
      <form>
        <StyledTextarea
          error={charactersLeft === 0}
          value={comment}
          onChange={handleTextareaChange}
          placeholder="Type your comment here..."
          maxLength={COMMENT_MAX_LENGTH}
        />
        <AnimatePresence>
          {error && (
            <ErrorMessage
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
            >
              {error}
            </ErrorMessage>
          )}
        </AnimatePresence>
        <div>
          <span>{charactersLeft} characters left</span>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      {insertionError && (
        <ErrorMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {insertionError.message}
        </ErrorMessage>
      )}
    </StyledCommentForm>
  );
}
