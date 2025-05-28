import Layout from '../../components/Layout';
import FiltersProvider from '../../context/filtersContext';
import Aside from './Aside';
import Suggestions from './Suggestions';

export default function Home() {
  return (
    <Layout>
      <FiltersProvider>
        <Aside />
        <Suggestions />
      </FiltersProvider>
    </Layout>
  );
}
