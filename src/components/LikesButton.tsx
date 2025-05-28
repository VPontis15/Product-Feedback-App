import styled from 'styled-components';
import arrowUp from '../assets/shared/icon-arrow-up.svg';
import { useLikeMutation } from '../hooks/useLikeMutation';

const StyledLikesButton = styled.button<{
  layout: 'horizontal' | 'vertical';
  isLiked: boolean;
}>`
  display: inline-flex;
  flex-direction: ${({ layout }) =>
    layout === 'horizontal' ? 'row' : 'column'};
  gap: 0.5rem;
  align-self: start;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--btn-radius);
  background-color: ${({ isLiked }) =>
    isLiked ? 'var(--color-blue)' : 'var(--color-like)'};
  padding-inline: 0.5rem;
  padding-block: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isLiked }) =>
      isLiked ? 'var(--color-blue)' : 'var(--color-blue-light)'};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  span {
    color: ${({ isLiked }) => (isLiked ? 'white' : 'var(--color-dark-blue)')};
    font-size: var(--fs-xs);
    letter-spacing: -0.18px;
    font-weight: 700;
  }

  @media (max-width: 550px) {
    grid-row: 2;
    flex-direction: row;
    justify-self: start;
    width: 4.3125rem;
    vertical-align: middle;
    padding-block: 0.469rem;
    margin-top: 1rem;
  }
`;

interface LikesButtonProps {
  suggestionId: string;
  suggestionSlug?: string;
  likeCount: number;
  layout?: 'horizontal' | 'vertical';
}

export default function LikesButton({
  suggestionId,
  suggestionSlug,
  likeCount,
  layout = 'horizontal',
}: LikesButtonProps) {
  const { userLiked, handleLikeClick, isLoading } = useLikeMutation({
    suggestionId,
    suggestionSlug,
  });

  return (
    <StyledLikesButton
      layout={layout}
      isLiked={userLiked}
      onClick={handleLikeClick}
      disabled={isLoading}
    >
      <img
        src={arrowUp}
        alt=""
        style={{ filter: userLiked ? 'brightness(0) invert(1)' : 'none' }}
      />
      <span>{isLoading ? '...' : likeCount}</span>
    </StyledLikesButton>
  );
}
