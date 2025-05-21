import styled from 'styled-components';
import RoadmapItem from './RoadmapItem';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../../api/supabase';
import ErrorMessage from '../../../components/ErrorMessage';
import { Link } from 'react-router';

const StyledRoadmap = styled.div`
  display: grid;
  gap: 1.5rem;
  align-self: start;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding-block-start: 1.25rem;
  padding-block-end: 1.5rem;
  padding-inline: 1.5rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: var(--color-blue);
      transition: color 0.3s ease;

      &:hover {
        color: var(--color-blue-hover);
      }
    }
  }

  h2 {
    font-size: var(--fs-lg);
    color: var(--color-dark-blue);
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const RoadmapItemWrapper = styled.section`
  display: grid;
  gap: 0.5rem;
`;

export default function Roadmap() {
  const {
    data: roadmapData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['statuses'],
    queryFn: async () => {
      try {
        const { data: status, error } = await supabase.from('status').select(`*,
            feedback:feedback (count)`);
        if (error) {
          throw new Error(error.message);
        }
        return status;
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    },
  });

  if (error) {
    return (
      <ErrorMessage>
        {error instanceof Error ? error.message : 'Something went wrong'}
      </ErrorMessage>
    );
  }

  return (
    <StyledRoadmap>
      <div>
        <h2>Roadmap</h2>
        <Link to="/roadmap">View</Link>
      </div>
      <RoadmapItemWrapper>
        {isLoading
          ? // Render skeleton placeholders when loading
            Array(3)
              .fill(0)
              .map((_, index) => (
                <RoadmapItem
                  key={`skeleton-${index}`}
                  isLoading={true}
                  backgroundcolor=""
                  quantity={0}
                >
                  Loading
                </RoadmapItem>
              ))
          : roadmapData &&
            roadmapData
              .filter((item) => item.update_status !== 'Suggestion')
              .map((roadmapItemData) => (
                <RoadmapItem
                  isLoading={false}
                  key={roadmapItemData.id}
                  backgroundcolor={roadmapItemData.color}
                  quantity={
                    roadmapItemData.feedback && roadmapItemData.feedback[0]
                      ? roadmapItemData.feedback[0].count
                      : 0
                  }
                >
                  {roadmapItemData.update_status}
                </RoadmapItem>
              ))}
      </RoadmapItemWrapper>
    </StyledRoadmap>
  );
}
