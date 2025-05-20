import styled from 'styled-components';
import Header from './components/Header';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../api/supabase';
import { lazy, Suspense } from 'react';
import Loader from '../../components/Loader';
const RoadmapContentWrapper = lazy(
  () => import('./components/RoadmapContentWrapper')
);

const RoadmapPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: min(1440px, 95%);
  margin-inline: auto;
  min-height: 100svh;
  padding-block: 5.9375rem;
  gap: 3rem;
`;

export default function RoadmapPage() {
  const { data, error } = useQuery({
    queryKey: ['roadmap'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('status')
          .select(
            `*,
            feedback:feedback!update_status_id(count)`
          )
          .neq('update_status', 'Suggestion');

        if (error) {
          throw new Error(error.message);
        }
        return data || [];
      } catch (error) {
        console.error('Error fetching roadmap data:', error);
        return [];
      }
    },
  });

  if (error) {
    return;
  }

  return (
    <RoadmapPageWrapper>
      <Header />
      {error ? (
        <h1>YIKES</h1>
      ) : (
        <Suspense fallback={<Loader />}>
          <RoadmapContentWrapper data={data || []} />
        </Suspense>
      )}
    </RoadmapPageWrapper>
  );
}
