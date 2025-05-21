import { motion } from 'motion/react';
import styled from 'styled-components';

const StatusHeaderWrapper = styled.div<{
  color: string;
  $isSelected: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${({ $isSelected }) => ($isSelected ? '1' : '0.4')};
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 1;
  }

  span {
    display: inline-block;
    font-weight: 700;
    opacity: ${({ $isSelected }) => ($isSelected ? '1' : '0.4')};
    color: var(--color-dark-blue);
  }
`;

const Underline = styled(motion.div)<{ color: string }>`
  width: 100%;
  height: 4px;
  background-color: ${(props) => props.color};
  position: absolute;
  bottom: -16px;
  left: 0;
`;

export default function RoadmapHeaderMobile({
  selectedStatus,
  data,
  handleStatusChange,
}) {
  return (
    <header>
      {data?.map((item) => (
        <StatusHeaderWrapper
          onClick={() => handleStatusChange(item.id)}
          $isSelected={item.id === selectedStatus}
          color={item.color}
          key={item.id}
        >
          <h3>{item.update_status}</h3>
          <span>({item.feedback[0]?.count || 0})</span>

          <Underline
            color={item.color}
            initial={{ scaleX: 0, originX: 0.5 }}
            animate={{
              scaleX: item.id === selectedStatus ? 1 : 0,
              originX: 0.5,
            }}
            whileHover={{
              scaleX: 1,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
              },
            }}
            transition={{
              duration: 0.3,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          />
        </StatusHeaderWrapper>
      ))}
    </header>
  );
}
