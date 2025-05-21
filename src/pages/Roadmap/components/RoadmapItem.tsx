import styled from 'styled-components';
import { Link } from 'react-router';
import Button from '../../../components/Button';
import UpVotesBtn from '../../../components/Upvotes';
import CommentLogo from '../../../components/CommentLogo';

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

export interface RoadmapItemProps {
  feedback: {
    id: string;
    title: string;
    description: string;
    status: {
      update_status: string;
    };
    category: {
      category: string;
    };
    upvotes: number;
    comment: number;
    slug: string;
  };
  color: string;
}

export default function RoadmapItem({ feedback, color }: RoadmapItemProps) {
  const { id, title, slug, description, status, category, upvotes, comment } =
    feedback;

  return (
    <StyledRoadmapItem color={color}>
      <TitleWrapper>
        <Circle color={color} />
        <h4>{status.update_status}</h4>
      </TitleWrapper>
      <RoadmapItemContent>
        <div>
          <Link to={`/feedback/${slug}`}>{title}</Link>
          <p>{description}</p>
        </div>
        <Button size="sm" variant="filter">
          {category.category}
        </Button>
        <ButtonsWrapper>
          <UpVotesBtn
            layout="horizontal"
            upvotes={upvotes}
            onClick={() => {
              console.log('Upvoted!');
            }}
          />
          <CommentLogo amount={comment[0].count} />
        </ButtonsWrapper>
      </RoadmapItemContent>
    </StyledRoadmapItem>
  );
}
