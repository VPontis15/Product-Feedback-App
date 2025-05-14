import Layout from '../../components/Layout';
import Aside from './Aside';

export default function Home() {
  return (
    <Layout>
      <Aside />
      <p>This is the home page of our application.</p>
    </Layout>
  );
}
