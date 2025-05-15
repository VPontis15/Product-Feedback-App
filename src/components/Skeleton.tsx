import styled from 'styled-components';

const SkeletonDiv = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  border-radius: 0.375rem; /* rounded-md */
  background-color: var(--color-dark-blue);

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <SkeletonDiv className={className} {...props} />;
}

export default Skeleton;
