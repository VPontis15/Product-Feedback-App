import styled from 'styled-components';
import arrowUp from '../../../assets/shared/icon-arrow-up.svg';
import commentsSvg from '../../../assets/shared/icon-comments.svg';
import Button from '../../../components/Button';
import { Link } from 'react-router';

// Update the interface to match the Supabase response structure
interface SuggestionProps {
  suggestion: {
    id: string;
    title: string;
    feedback_detail: string;
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
  grid-template-columns: 2.5rem 1fr;
  gap: 2.5rem;
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
  padding-inline: 0.5.5rem;
  padding-block: 0.875rem 0.5rem;
  cursor: pointer;

  span {
    color: var(--color-dark-blue);
    font-size: var(--fs-xs);
    letter-spacing: -0.18px;
    font-weight: 700;
  }
`;

const CommentsWrapper = styled.div`
  display: flex;
  items: center;
  gap: 0.5rem;

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
  }
`;

const SuggestionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  button {
    align-self: flex-start;
  }
`;

export default function Suggestion({ suggestion }: SuggestionProps) {
  const {
    title,
    slug,
    feedback_detail: description,
    category,
    upvotes,
  } = suggestion;
  const commentsCount = suggestion.comment[0]?.count | 0;

  return (
    <SuggestionWrapper>
      <Likes>
        <img src={arrowUp} alt="" />
        <span>{upvotes}</span>
      </Likes>
      <SuggestionContent>
        <SuggestionDetailsWrapper>
          <div>
            <Link to={`/suggestion/${slug}`}>{title}</Link>
            <p>{description}</p>
          </div>
          <CommentsWrapper>
            <img src={commentsSvg} alt="" />
            <span>{commentsCount || 0}</span>
          </CommentsWrapper>
        </SuggestionDetailsWrapper>
        <Button variant="filter" size="sm">
          {category?.category || 'No Category'}
        </Button>
      </SuggestionContent>
    </SuggestionWrapper>
  );
}
