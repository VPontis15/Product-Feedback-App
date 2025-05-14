import styled from 'styled-components';
import Header from './components/Header';
import Filters from './components/Filters';
import Roadmap from './components/Roadmap';

const StyledAside = styled.aside`
  display: grid;
  gap: 1.5rem;
  align-self: start;
`;

export default function Aside() {
  return (
    <StyledAside>
      <Header />
      <Filters />
      <Roadmap />
    </StyledAside>
  );
}
