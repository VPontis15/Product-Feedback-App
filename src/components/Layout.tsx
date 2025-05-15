import styled from 'styled-components';

const RootLayout = styled.div`
  display: grid;
  grid-template-columns: 255px 1fr;
  gap: var(--grid-gap);
  max-width: min(1440px, 95%);
  margin-inline: auto;
  min-height: 100svh;
  padding-block: 5.9375rem;

  @media (max-width: 986px) {
    grid-template-columns: 1fr;
    padding-block: 3.875rem;
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
