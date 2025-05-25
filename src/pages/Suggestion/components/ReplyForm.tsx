import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { useAddComment } from '../../../hooks/useAddComment';
import { motion } from 'framer-motion';

const StyledReplyForm = styled(motion.form)`
  display: grid;
  grid-template-columns: 2.5rem 1fr;

  align-items: start;
  margin-top: 1rem;

  > div {
    display: flex;
    gap: 1rem;
    align-items: start;
  }
  textarea {
    flex: 1;
    padding: 1rem;
    border: 1px solid var(--color-dark-blue);
    border-radius: var(--btn-radius);
    resize: vertical;
    font-size: var(--fs-md);
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: addReply } = useAddComment({
    feedback_id,
    slug,
    onSuccess: () => {
      setReply('');
      onSuccess?.();
    },
  });

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim()) {
      addReply({ comment: reply, parent_comment_id });
    }
  };

  return (
    <StyledReplyForm
      onSubmit={handleSubmit}
      initial={{
        opacity: 0,
        height: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        height: 'auto',
        y: 0,
      }}
      exit={{
        opacity: 0,
        height: 0,
        y: -20,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <div></div>
      <div>
        <textarea
          ref={textareaRef}
          placeholder="Write your reply here..."
          rows={4}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <Button size="sm" variant="primary" type="submit">
          Post Reply
        </Button>
      </div>
    </StyledReplyForm>
  );
}
