import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { useAddComment } from '../../../hooks/useAddComment';

const StyledReplyForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: start;

  textarea {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--color-dark-blue);
    border-radius: var(--btn-radius);
  }
`;

interface ReplyFormProps {
  slug: string;
  feedback_id: number;
  parent_comment_id: number;
  onSuccess?: () => void;
}

export default function ReplyForm({
  slug,
  feedback_id,
  parent_comment_id,
  onSuccess,
}: ReplyFormProps) {
  const [reply, setReply] = useState('');

  const { mutate: addReply } = useAddComment({
    feedback_id,
    slug,
    onSuccess: () => {
      setReply('');
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReply({ comment: reply, parent_comment_id });
  };

  return (
    <StyledReplyForm onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your reply here..."
        rows={4}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <Button size="sm" variant="primary" type="submit">
        Post Reply
      </Button>
    </StyledReplyForm>
  );
}
