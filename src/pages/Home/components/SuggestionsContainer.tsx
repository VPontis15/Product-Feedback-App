import styled from 'styled-components';

const StyledSuggestionsContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--color-dark-gray);
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  flex: 1;

  @media (max-width: 768px) {
    padding-block: 7rem;
  }
`;

export default function SuggestionsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledSuggestionsContainer>{children}</StyledSuggestionsContainer>;
}
