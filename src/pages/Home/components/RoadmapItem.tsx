import styled from 'styled-components';
import Skeleton from '../../../components/Skeleton';

interface RoadmapItemProps {
  backgroundcolor: string;
  children: React.ReactNode;
  quantity: number;
  isLoading: boolean;
}

const StyledRoadmapItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h3 {
    color: var(--color-dark-gray);
    text-transform: capitalize;
    font-size: var(--fs-base);
  }

  span {
    color: var(--color-dark-blue);
    font-weight: 700;
    font-size: var(--fs-base);
  }
`;

const RoadmapItemCircle = styled.div<{ backgroundcolor: string }>`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${(props) => props.backgroundcolor};
  border-radius: 50%;
`;

const SkeletonCircle = styled(Skeleton)`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
`;

const SkeletonText = styled(Skeleton)`
  width: 5rem;
  height: 1rem;
`;

const SkeletonQuantity = styled(Skeleton)`
  width: 1rem;
  height: 1rem;
  border-radius: 0.375rem; /* rounded-md */
`;

export default function RoadmapItem({
  backgroundcolor,
  children,
  quantity,
  isLoading,
}: RoadmapItemProps) {
  if (isLoading) {
    return (
      <StyledRoadmapItem>
        <div>
          <SkeletonCircle />
          <SkeletonText />
        </div>
        <SkeletonQuantity />
      </StyledRoadmapItem>
    );
  }
  return (
    <StyledRoadmapItem>
      <div>
        <RoadmapItemCircle backgroundcolor={backgroundcolor} />
        <h3>{children}</h3>
      </div>
      <span>{quantity}</span>
    </StyledRoadmapItem>
  );
}
