import styled from 'styled-components';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
}

const SkeletonDiv = styled.div<{ width?: string }>`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  border-radius: 0.375rem; /* rounded-md */
  background-color: var(--color-skeleton);
  width: ${(props) => props.width || 'auto'};

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

function Skeleton({ className, width, ...props }: SkeletonProps) {
  return <SkeletonDiv className={className} width={width} {...props} />;
}

export default Skeleton;
