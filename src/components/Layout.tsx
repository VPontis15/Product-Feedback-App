import styled from 'styled-components';

const RootLayout = styled.main`
  display: grid;
  grid-template-columns: 255px 1fr;
  gap: var(--grid-gap);
  max-width: min(1740px, 95%);
  margin-inline: auto;
  min-height: 100svh;
  padding: 5.9375rem;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
