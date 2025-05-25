import Layout from '../../components/Layout';
import FiltersProvider from '../../context/filtersContext';
import { useAuth } from '../../hooks/useAuth';
import Aside from './Aside';
import Suggestions from './Suggestions';

export default function Home() {
  const { user } = useAuth();
  console.log('Current user:', user);

  return (
    <Layout>
      <FiltersProvider>
        <Aside />
        <Suggestions />
      </FiltersProvider>
    </Layout>
  );
}
