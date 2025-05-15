import styled from 'styled-components';
import backgroundHeader from '../../../assets/suggestions/desktop/background-header.png';
import backgroundHeaderTablet from '../../../assets/suggestions/tablet/background-header.png';
import backgroundHeaderMobile from '../../../assets/suggestions/mobile/background-header.png';

const StyledHeader = styled.header`
  position: relative;
  display: grid;
  height: 100%;
  align-items: end;
  padding-inline: 1.5rem;
  border-radius: var(--btn-radius);
  overflow: hidden;
  padding-block: 3.875rem 1.5rem;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  border-radius: var(--btn-radius);
`;

const StyledText = styled.div`
  z-index: 1;
  color: var(--color-white);
  display: grid;
  gap: 0.125rem;

  h1 {
    font-size: var(--fs-xl);
    line-height: var(--line-heading);
    font-weight: 700;
  }
  p {
    font-size: var(--fs-sm);
    line-height: var(--line-base);
    font-weight: 400;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <picture>
        <source srcSet={backgroundHeaderMobile} media="(max-width: 500px)" />
        <source srcSet={backgroundHeaderTablet} media="(max-width: 1023px)" />
        <StyledImage
          width={255}
          height={135}
          src={backgroundHeader}
          alt="Header background"
        />
      </picture>
      <StyledText>
        <h1>Frontend Mentor</h1>
        <p>Feedback Board</p>
      </StyledText>
    </StyledHeader>
  );
}
