import Layout from '../../components/Layout';
import Aside from './Aside';
import Suggestions from './Suggestions';

export default function Home() {
  return (
    <Layout>
      <Aside />
      <Suggestions />
    </Layout>
  );
}
