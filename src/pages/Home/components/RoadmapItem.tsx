import styled from 'styled-components';

interface RoadmapItemProps {
  backgroundColor: string;
  children: React.ReactNode;
  quantity: number;
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
    font-weight: 300;
  }

  span {
    color: var(--color-dark-blue);
    font-weight: 700;
    font-size: var(--fs-base);
  }
`;

const RoadmapItemCircle = styled.div<{ backgroundColor: string }>`
  width: 0.5rem;
    height: 0.5rem;
    background-color: ${(props) => props.backgroundColor};
    border-radius: 50%;
    }
    `;

export default function RoadmapItem({
  backgroundColor,
  children,
  quantity,
}: RoadmapItemProps) {
  return (
    <StyledRoadmapItem>
      <div>
        <RoadmapItemCircle backgroundColor={backgroundColor} />
        <h3>{children}</h3>
      </div>
      <span>{quantity}</span>
    </StyledRoadmapItem>
  );
}
