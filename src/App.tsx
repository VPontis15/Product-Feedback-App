import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
--color-purple: #AD1FEA;
--color-blue:#4661E6;
--color-black:rgb(55, 63, 104);
--color-white: #ffffff;
--color-light-gray:#F2F4FF;
--color-gray:#F7f8FD;
--color-dark-blue:#3A4374;
--color-dark-gray:#647196;
--color-orange:#F49F85;
--color-cyan:#62BCFA;

--ff-primary: 'Jost', sans-serif;

--fs-base: 1rem;
--fs-sm: 0.875rem; 
--fs-lg: 1.125rem;
--fs-xl: 1.25rem;
--fs-xxl: 1.5rem;

--line-base: 1.5;
--line-heading: 1.25;

}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;}
body {
  font-family: var(--ff-primary);
  font-size: var(--fs-base);
  linhe-height: var(--line-base);
}
  img {
    max-width: 100%;
    height: auto;
    display: block;}`;

function App() {
  return (
    <>
      <GlobalStyle />
    </>
  );
}

export default App;
