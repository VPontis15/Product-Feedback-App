import styled from 'styled-components';

const StyledRoadmapItemColumnHeader = styled.div`
  h2 {
    font-size: var(--fs-lg);
  }

  p {
    color: var(--color-dark-gray);
  }
`;

export function RoadmapItemColumnHeader({
  title,
  description,
  quantity,
}: {
  title: string;
  description: string;
  quantity?: number;
}) {
  return (
    <StyledRoadmapItemColumnHeader>
      <h2>
        {title} <span>({quantity})</span>
      </h2>
      <p>{description}</p>
    </StyledRoadmapItemColumnHeader>
  );
}
