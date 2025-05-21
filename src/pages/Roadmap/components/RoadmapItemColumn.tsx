import styled from 'styled-components';
import supabase from '../../../api/supabase';
import { useQuery } from '@tanstack/react-query';
import { RoadmapItemColumnHeader } from './RoadmapItemColumnHeader';
import RoadmapItem from './RoadmapItem';

const RoadmapItemColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FeedBackItemColumnWrapper = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export default function RoadmapItemColumn({
  title,
  description,
  color,
  quantity = 0,
}: {
  title: string;
  description: string;
  quantity?: number;
  color: string;
}) {
  const { data } = useQuery({
    queryKey: ['roadmapColumn', title],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('feedback')
          .select(
            `*,
            status!inner(update_status),
            comment(count),
            category!inner(category)`
          )
          .eq('status.update_status', title);
        if (error) throw new Error(error.message);
        return data;
      } catch (error) {
        console.error('Error fetching roadmap column data:', error);
        return [];
      }
    },
  });

  return (
    <RoadmapItemColumnWrapper>
      <RoadmapItemColumnHeader
        quantity={quantity}
        title={title}
        description={description}
      />
      <FeedBackItemColumnWrapper>
        {data?.map((feedback) => (
          <RoadmapItem key={feedback.id} color={color} feedback={feedback} />
        ))}
      </FeedBackItemColumnWrapper>
    </RoadmapItemColumnWrapper>
  );
}
