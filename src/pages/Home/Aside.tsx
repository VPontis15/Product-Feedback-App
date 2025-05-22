import styled from 'styled-components';
import Header from './components/Header';
import Filters from './components/Filters';
import Roadmap from './components/Roadmap';
import { useState } from 'react';
import FiltersMobile from './components/mobile/FiltersMobile';
import RoadmapMobile from './components/mobile/RoadmapMobile';

import { motion, AnimatePresence } from 'framer-motion';

const StyledAside = styled.aside`
  display: grid;
  gap: 1.5rem;
  align-self: start;
  position: relative;

  @media (max-width: 986px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const MobileWrapperBase = styled.div`
  display: none;
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: fixed;
    z-index: 999;
    min-height: calc(100svh - 77px);
    right: 0;
    top: 77px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    padding-inline: 1.5rem;
    padding-block: 1.5rem;
    background-color: var(--color-light-gray);
    max-width: 271px;
    > div {
      width: 100%;
    }
  }
`;

const MobileWrapper = motion(MobileWrapperBase);

// Create styled motion divs for the children to animate
const AnimatedChild = styled(motion.div)`
  width: 100%;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  top: 77px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 998;
  transition: opacity 0.3s ease;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
`;

// Animation variants
const containerVariants = {
  hidden: {
    x: 300,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: 300,
    opacity: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    x: 20,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export default function Aside() {
  const [isOpen, setIsOpen] = useState(false);

  // Animation-aware close handler
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <StyledAside>
      <Header isOpen={isOpen} handleIsOpen={setIsOpen} />
      <Filters />
      <Roadmap />
      <Overlay onClick={handleClose} $isOpen={isOpen} />
      <AnimatePresence mode="wait">
        {isOpen && (
          <MobileWrapper
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AnimatedChild variants={itemVariants}>
              <FiltersMobile />
            </AnimatedChild>
            <AnimatedChild variants={itemVariants}>
              <RoadmapMobile />
            </AnimatedChild>
          </MobileWrapper>
        )}
      </AnimatePresence>
    </StyledAside>
  );
}
