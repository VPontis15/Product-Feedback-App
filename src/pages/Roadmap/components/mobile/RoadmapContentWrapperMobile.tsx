import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../../../api/supabase';
import RoadmapHeaderMobile from './RoadmapHeaderMobile';
import RoadmapItem from '../RoadmapItem';
import type { RoadmapContentWrapperProps } from '../RoadmapContentWrapper';
import { useMobileView } from '../../../../hooks/useMobileView';

const StyledRoadmapContentWrapperMobile = styled.main`
  display: none;

  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    max-width: 90%;
    margin-inline: auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: min(1440px, 90%);
    gap: 1rem;
  }

  section {
    margin-block-start: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > div {
      padding-block: 1.5rem;

      p {
        color: var(--color-dark-gray);
      }
    }
  }
`;

export default function RoadmapContentWrapperMobile({
  data,
  selectedStatus,
  handleSelectedStatus,
}: RoadmapContentWrapperProps) {
  const isMobile = useMobileView();
  const { data: feedback } = useQuery({
    queryKey: ['roadmap-feedback', selectedStatus],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('feedback_with_comments_and_likes')
          .select(
            `
            *,
            status!inner(update_status, color, description),
            category!inner(category)
          `
          )
          .eq('update_status_id', selectedStatus);

        if (error) {
          throw new Error(error.message);
        }

        return data || [];
      } catch (error) {
        console.error('Error fetching roadmap feedback data:', error);
        return [];
      }
    },
    enabled: !!selectedStatus && isMobile, // Only run query when selectedStatus exists
  });
  const selectedStatusData = data?.find(
    (status) => status.id === selectedStatus
  );

  return (
    <StyledRoadmapContentWrapperMobile>
      <RoadmapHeaderMobile
        data={data}
        handleStatusChange={handleSelectedStatus}
        selectedStatus={selectedStatus}
      />
      <section>
        <div>
          <h2>{selectedStatusData?.update_status}</h2>
          <p>{selectedStatusData?.description}</p>
        </div>
        {feedback?.map((item) => (
          <RoadmapItem
            feedback={item}
            color={item.status.color}
            key={item.id}
          />
        ))}
      </section>
    </StyledRoadmapContentWrapperMobile>
  );
}
