import styled from 'styled-components';
import commentsSvg from '../assets/shared/icon-comments.svg';
const CommentLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: var(--color-dark-blue);
  }
`;
export default function CommentLogo({ amount }: { amount: number }) {
  return (
    <CommentLogoWrapper>
      <img src={commentsSvg} alt="" />
      <span>{amount}</span>
    </CommentLogoWrapper>
  );
}
