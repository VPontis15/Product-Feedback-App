import styled from 'styled-components';
import Button from '../../../components/Button';
import GoBackBtn from '../../../components/GoBackBtn';
const SuggestionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default function Header({ slug }: { slug: string }) {
  return (
    <SuggestionHeader>
      <GoBackBtn />
      <Button to={`/feedback/${slug}/edit`} variant="secondary" size="sm">
        Edit Feedback
      </Button>
    </SuggestionHeader>
  );
}
