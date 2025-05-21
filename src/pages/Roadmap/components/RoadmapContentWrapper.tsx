import styled from 'styled-components';
import RoadmapItemColumn from './RoadmapItemColumn';
import RoadmapContentWrapperMobile from './mobile/RoadmapContentWrapperMobile';

export interface RoadmapContentWrapperProps {
  data: {
    id: string;
    color: string;
    update_status: string;
    description: string;
    feedback: [{ count: number }];
  }[];
}

const StyledRoadmapContentWrapper = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.875rem;
  margin-inline: auto;
  width: 100%;

  @media (max-width: 650px) {
    display: none;
  }
`;

export default function RoadmapContentWrapper({
  data,
}: RoadmapContentWrapperProps) {
  return (
    <>
      <RoadmapContentWrapperMobile data={data} />
      <StyledRoadmapContentWrapper>
        {data?.map((item) => (
          <RoadmapItemColumn
            color={item.color}
            key={item.id}
            title={item.update_status}
            quantity={item.feedback[0].count}
            description={item.description}
          />
        ))}
      </StyledRoadmapContentWrapper>
    </>
  );
}
