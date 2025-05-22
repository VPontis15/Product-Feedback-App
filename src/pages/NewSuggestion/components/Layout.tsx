import styled from 'styled-components';

const RootLayout = styled.main`
  display: grid;
  grid-template-columns: 255px 1fr;
  gap: var(--grid-gap);
  max-width: min(1140px, 90%);
  margin-inline: auto;
  min-height: 100svh;
  padding-block: 5.9375rem;

  @media (max-width: 986px) {
    grid-template-columns: 1fr;
    padding-block: 3.875rem;
    min-height: auto;
    gap: 2.5rem;
  }

  @media (max-width: 650px) {
    gap: 0;
    padding-block: 0;
    max-width: 100%;
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
