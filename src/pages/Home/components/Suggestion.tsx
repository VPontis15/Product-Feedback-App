import styled from 'styled-components';
import arrowUp from '../../../assets/shared/icon-arrow-up.svg';
import commentsSvg from '../../../assets/shared/icon-comments.svg';
import Button from '../../../components/Button';

interface SuggestionProps {
  suggestion: {
    id: string;
    title: string;
    description: string;
    category: string;
    likes: number;
    comments: number;
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
`;

const SuggestionDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;

  h3 {
    color: var(--color-dark-blue);
    font-size: var(--fs-lg);
    font-weight: 700;
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
  const { id, title, description, category, likes, comments } = suggestion;
  return (
    <SuggestionWrapper>
      <Likes>
        <img src={arrowUp} alt="" />
        <span>{likes}</span>
      </Likes>
      <SuggestionContent>
        <SuggestionDetailsWrapper>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <CommentsWrapper>
            <img src={commentsSvg} alt="" />
            <span>{comments} comments</span>
          </CommentsWrapper>
        </SuggestionDetailsWrapper>
        <Button variant="filter" size="sm">
          {category}
        </Button>
      </SuggestionContent>
    </SuggestionWrapper>
  );
}
