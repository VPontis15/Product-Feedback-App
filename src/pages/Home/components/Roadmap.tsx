import styled from 'styled-components';
import RoadmapItem from './RoadmapItem';

const StyledRoadmap = styled.div`
  display: grid;
  gap: 1.5rem;
  align-self: start;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding-block-start: 1.25rem;
  padding-block-end: 1.5rem;
  padding-inline: 1.5rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: var(--color-blue);
      transition: color 0.3s ease;

      &:hover {
        color: var(--color-blue-hover);
      }
    }
  }

  h2 {
    font-size: var(--fs-lg);
    color: var(--color-dark-blue);
  }
`;

const RoadmapItemWrapper = styled.section`
  display: grid;
  gap: 0.5rem;
`;

export default function Roadmap() {
  return (
    <StyledRoadmap>
      <div>
        <h2>Roadmap</h2>
        <a href="">View</a>
      </div>
      <RoadmapItemWrapper>
        <RoadmapItem backgroundColor="#F49F85" quantity={2}>
          Planned
        </RoadmapItem>
        <RoadmapItem backgroundColor="#AD1FEA" quantity={2}>
          In Progress
        </RoadmapItem>
        <RoadmapItem backgroundColor="#62BCFA" quantity={2}>
          Live
        </RoadmapItem>
      </RoadmapItemWrapper>
    </StyledRoadmap>
  );
}
