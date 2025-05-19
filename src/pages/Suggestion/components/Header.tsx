import styled from 'styled-components';
import Button from '../../../components/Button';
import GoBackBtn from '../../../components/GoBackBtn';
const SuggestionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default function Header() {
  return (
    <SuggestionHeader>
      <GoBackBtn />
      <Button variant="secondary" size="sm">
        Edit Feedback
      </Button>
    </SuggestionHeader>
  );
}
