import { createBrowserRouter, RouterProvider } from 'react-router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
--color-purple: #AD1FEA;
--color-blue:#4661E6;
--color-black:#373f68;
--color-white: #ffffff;
--color-light-gray:#F2F4FF;
--color-gray:#F7f8FD;
--color-dark-blue:#3A4374;
--color-red:#D73737;
--color-dark-gray:#647196;
--color-orange:#F49F85;
--color-cyan:#62BCFA;

--color-purple-hover:#C75AF6
--color-blue-hover:#7C91F9
--color-black-hover:#656EA3;
--color-white-hover:#F7F8FD;
--color-red-hover:#E98888;

--ff-primary: 'Jost', sans-serif;

--fs-base: 1rem;
--fs-sm: 0.875rem; 
--fs-lg: 1.125rem;
--fs-xl: 1.25rem;
--fs-xxl: 1.5rem;

--line-base: 1.5;
--line-heading: 1.25;


--btn-radius: 0.625rem;
--btn-width: 9.875rem;
--btn-height: 2.75rem;
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Welcome to the App</h1>,
  },
]);

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
