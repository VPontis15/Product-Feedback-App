import styled from 'styled-components';
import Header from './components/Header';
import NewSuggestionForm from './components/NewSuggestionForm';

const RootLayout = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  padding-block: 3.5rem;
  max-width: min(1140px, 90%);
  margin-inline: auto;
  min-height: 100svh;
`;

export default function NewSuggestionPage() {
  return (
    <RootLayout>
      <Header />
      <NewSuggestionForm />
    </RootLayout>
  );
}
