import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SuggestionPage from './pages/Suggestion/SuggestionPage';
import NewSuggestionPage from './pages/NewSuggestion/NewSuggestionPage';

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
--color-like: #F2F4FE;
--color-purple-hover:#C75AF6;
--color-blue-hover:#7C91F9;
--color-dark-blue-hover:#656EA3;
--color-white-hover:#F7F8FD;
--color-red-hover:#E98888;
--color-comment: #8594F8;
--color-comment-divider:#979797;
--color-skeleton: var(--color-comment-divider);
--ff-primary: 'Jost', sans-serif;

--fs-xxs: 0.8125rem;
--fs-xs: 0.875rem; 
--fs-sm: 0.9375rem; 
--fs-base: 1rem;
--fs-lg: 1.125rem;
--fs-xl: 1.25rem;
--fs-xxl: 1.5rem;

--line-base: 1.5;
--line-lg: 1.75;
--line-heading: 1.25;


--btn-radius: 0.675rem;
--btn-width: 9.875rem;
--btn-height: 2.75rem;

--box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

--grid-gap: 1.875rem;
}

*::selection {
  background-color: var(--color-orange);
  color: var(--color-white);}
 

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;}
body {
  font-family: var(--ff-primary);
  font-size: var(--fs-base);
  line-height: var(--line-base);
  background-color: var(--color-light-gray);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--ff-primary);
  color: var(--color-dark-blue);
}
  img {
    max-width: 100%;
    height: auto;
    display: block;}`;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'feedback/:slug',
    element: <SuggestionPage />,
  },
  {
    path: 'feedback/new',
    element: <NewSuggestionPage />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
