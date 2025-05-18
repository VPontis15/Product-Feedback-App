import styled from 'styled-components';
import arrowUp from '../../../assets/shared/icon-arrow-up.svg';
import commentsSvg from '../../../assets/shared/icon-comments.svg';
import Button from '../../../components/Button';
import { Link } from 'react-router';
import Skeleton from '../../../components/Skeleton';

// Update the interface to match the Supabase response structure
interface SuggestionProps {
  isLoading?: boolean;
  suggestion: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: {
      category: string;
    };
    status: {
      update_status: string;
    };
    upvotes: number;
    comment: {
      count: number;
    }[];
  };
}

const SuggestionWrapper = styled.article`
  width: 100%;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding-block: 1.5rem;
  padding-inline: 1.5rem;
  display: grid;
  grid-template-columns: 2.5rem 1fr 2.5rem;
  gap: 2.5rem;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const Likes = styled.button`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: start;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--btn-radius);
  background-color: var(--color-like);
  padding-inline: .5rem;
  padding-block: 0.875rem 0.5rem;
  cursor: pointer;

  span {
    color: var(--color-dark-blue);
    font-size: var(--fs-xs);
    letter-spacing: -0.18px;
    font-weight: 700;
  }

  @media (max-width: 550px) {
  grid-row:2;
  flex-direction: row;
  justify-self: start;
  width:4.3125rem;
  vertical-align: middle;
  padding-block: .469rem;
  margin-top:1rem;
`;

const CommentsWrapper = styled.div`
  display: flex;
  items: center;
  gap: 0.5rem;
  align-self: center;
  justify-self: center;
  padding-block-end: 1rem;
  img {
    color: #8594f8;
    background-color: var(--color-white);
    fill: #8594f8;
    width: 1.125rem;
    height: 1rem;
    align-self: center;
    cursor: pointer;
  }

  span {
    color: var(--color-dark-blue);
    font-weight: 700;
    font-size: var(--fs-base);
  }

  @media (max-width: 550px) {
  grid-row:2;
    margin-top:1rem;

`;

const SuggestionDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;

  a {
    color: var(--color-dark-blue);
    font-size: var(--fs-lg);
    font-weight: 700;
    text-decoration: none;
  }

  p {
    color: var(--color-dark-gray);
    font-weight: 400;
    line-height: 1.5rem;
    display: block;
    width: 100%;
  }
`;

const SuggestionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  button {
    align-self: flex-start;
    padding-inline: 1.125rem;
  }
`;

const SkeletonTextHeading = styled(Skeleton)`
  height: 1.6rem;
  width: 10rem;

  margin-bottom: 0.5rem;
`;
const SkeletonTextDesc = styled(Skeleton)`
  height: 1rem;
  width: 20rem;

  margin-bottom: 0.5rem;
`;
const SkeletonTextReply = styled(Skeleton)`
  height: 1.5rem;
  width: 1.5rem;
`;

const SkeletonCat = styled(Skeleton)`
  height: 2rem;
  width: 5rem;
  border-radius: var(--btn-radius);
`;

const SkeletonLikes = styled(Skeleton)`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: start;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--btn-radius);
  padding-inline: 0.5.5rem;
  padding-block: 0.875rem 0.5rem;
  cursor: pointer;
  height: 3rem;
`;

export default function Suggestion({ suggestion, isLoading }: SuggestionProps) {
  if (isLoading) {
    return (
      <SuggestionWrapper>
        <SkeletonLikes />

        <SuggestionContent>
          <SuggestionDetailsWrapper>
            <div>
              <SkeletonTextHeading />
              <SkeletonTextDesc />
            </div>
            <SkeletonTextReply />
          </SuggestionDetailsWrapper>
          <SkeletonCat />
        </SuggestionContent>
      </SuggestionWrapper>
    );
  }

  const { title, slug, description, category, upvotes } = suggestion;
  const commentsCount = suggestion.comment[0]?.count || 0;

  return (
    <SuggestionWrapper>
      <Likes>
        <img src={arrowUp} alt="" />
        <span>{upvotes}</span>
      </Likes>
      <SuggestionContent>
        <SuggestionDetailsWrapper>
          <div>
            <Link to={`/feedback/${slug}`}>{title}</Link>
            <p>{description}</p>
          </div>
        </SuggestionDetailsWrapper>
        <Button variant="filter" size="sm">
          {category?.category || 'No Category'}
        </Button>
      </SuggestionContent>
      <CommentsWrapper>
        <img src={commentsSvg} alt="" />
        <span>{commentsCount}</span>
      </CommentsWrapper>
    </SuggestionWrapper>
  );
}
