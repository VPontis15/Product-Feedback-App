import styled from 'styled-components';
import arrowUp from '../assets/shared/icon-arrow-up.svg';

const StyledUpvotes = styled.button<{
  layout: 'horizontal' | 'vertical';
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
  background-color: var(--color-like);
  padding-inline: 0.5rem;
  padding-block: 0.875rem 0.5rem;
  cursor: pointer;

  span {
    color: var(--color-dark-blue);
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

export default function UpVotesBtn({
  upvotes,
  onClick,
  layout = 'horizontal',
}: {
  upvotes: number;
  onClick: () => void;
  layout?: 'horizontal' | 'vertical';
}) {
  return (
    <StyledUpvotes layout={layout} onClick={onClick}>
      <img src={arrowUp} alt="" />
      <span>{upvotes}</span>
    </StyledUpvotes>
  );
}
