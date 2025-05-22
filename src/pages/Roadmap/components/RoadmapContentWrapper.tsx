import styled from 'styled-components';
import RoadmapItemColumn from './RoadmapItemColumn';
import RoadmapContentWrapperMobile from './mobile/RoadmapContentWrapperMobile';
import { useMobileView } from '../../../hooks/useMobileView';

export interface RoadmapContentWrapperProps {
  selectedStatus: string;
  handleSelectedStatus: (status: string) => void;
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
  selectedStatus,
  handleSelectedStatus,
}: RoadmapContentWrapperProps) {
  const isMobile = useMobileView();

  if (isMobile) {
    return (
      <RoadmapContentWrapperMobile
        selectedStatus={selectedStatus}
        handleSelectedStatus={handleSelectedStatus}
        data={data}
      />
    );
  }
  return (
    <>
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
