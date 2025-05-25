import styled from 'styled-components';
import Button from '../../../components/Button';
import GoBackBtn from '../../../components/GoBackBtn';
import { useAuth } from '../../../hooks/useAuth';
const SuggestionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;
export default function Header({
  slug,
  feedbackUserId,
}: {
  slug: string;
  feedbackUserId?: string;
}) {
  const { user } = useAuth();
  return (
    <SuggestionHeader>
      <GoBackBtn />
      {user?.id === feedbackUserId && (
        <div className="actions">
          <Button to={`/suggestion/${slug}/delete`} variant="error" size="sm">
            Delete Feedback
          </Button>
          <Button to={`/feedback/${slug}/edit`} variant="secondary" size="sm">
            Edit Feedback
          </Button>
        </div>
      )}
    </SuggestionHeader>
  );
}
