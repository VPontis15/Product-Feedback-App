import styled from 'styled-components';
import Button from '../../../components/Button';
import UpVotesBtn from '../../../components/Upvotes';
import CommentLogo from '../../../components/CommentLogo';
import supabase from '../../../api/supabase';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const StyledRoadmapItem = styled.article<{ color: string }>`
  width: 100%;
  border-top: 6px solid ${({ color }) => color};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding-block: 1.5rem;
  padding-inline: 1.5rem;
  display: flex;
  flex-direction: column;
  padding-inline: 2rem;
  padding-block: 2rem;
  align-items: start;
  background-color: var(--color-white);

  h4 {
    margin-block-end: 0.5rem;
  }

  a {
    font-size: var(--fs-lg);
    text-decoration: none;
    color: var(--color-dark-blue);
    font-weight: 700;
  }

  p {
    color: var(--color-dark-gray);
  }
`;

const RoadmapItemColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RoadmapItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: start;
`;

const StyledRoadmapItemColumnHeader = styled.div`
  h2 {
    font-size: var(--fs-lg);
  }

  p {
    color: var(--color-dark-gray);
  }
`;

const FeedBackItemColumnWrapper = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const Circle = styled.div<{
  color: string;
}>`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin-block-end: 0.5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
          <RoadmapItem
            key={feedback.id}
            color={color}
            feedback={{
              id: feedback.id,
              title: feedback.title,
              description:
                feedback.description.length > 55
                  ? feedback.description.slice(0, 55) + '...'
                  : feedback.description,
              status: feedback.status.update_status,
              category: feedback.category.category,
              upvotes: feedback.upvotes,
              comments: feedback.comment.length,
              slug: feedback.slug,
            }}
          />
        ))}
      </FeedBackItemColumnWrapper>
    </RoadmapItemColumnWrapper>
  );
}

function RoadmapItemColumnHeader({
  title,
  description,
  quantity,
}: {
  title: string;
  description: string;
  quantity?: number;
}) {
  return (
    <StyledRoadmapItemColumnHeader>
      <h2>
        {title} <span>({quantity})</span>
      </h2>
      <p>{description}</p>
    </StyledRoadmapItemColumnHeader>
  );
}

interface RoadmapItemProps {
  feedback: {
    id: string;
    title: string;
    description: string;
    status: string;
    category: string;
    upvotes: number;
    comments: number;
    slug: string;
  };
  color: string;
}

function RoadmapItem({ feedback, color }: RoadmapItemProps) {
  const { id, title, slug, description, status, category, upvotes, comments } =
    feedback;
  return (
    <StyledRoadmapItem color={color}>
      <TitleWrapper>
        <Circle color={color} />
        <h4>{status}</h4>
      </TitleWrapper>
      <RoadmapItemContent>
        <div>
          <Link to={`/feedback/${slug}`}>{title}</Link>
          <p>{description}</p>
        </div>
        <Button size="sm" variant="filter">
          {category}
        </Button>
        <ButtonsWrapper>
          <UpVotesBtn
            layout="horizontal"
            upvotes={upvotes}
            onClick={() => {
              console.log('Upvoted!');
            }}
          />
          <CommentLogo amount={2} />
        </ButtonsWrapper>
      </RoadmapItemContent>
    </StyledRoadmapItem>
  );
}
