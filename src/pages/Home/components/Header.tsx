import styled from 'styled-components';
import backgroundHeader from '../../../assets/suggestions/desktop/background-header.png';
import backgroundHeaderTablet from '../../../assets/suggestions/tablet/background-header.png';
import backgroundHeaderMobile from '../../../assets/suggestions/mobile/background-header.png';
import hamburgerIcon from '../../../assets/shared/mobile/icon-hamburger.svg';
import closeMobileMenuIcon from '../../../assets/shared/mobile/icon-close.svg';
import { preload } from 'react-dom';
import { CiLogout } from 'react-icons/ci';
import { useAuth } from '../../../hooks/useAuth';
preload(backgroundHeader, {
  as: 'image',
  fetchPriority: 'high',
});
preload(backgroundHeaderTablet, {
  as: 'image',
  fetchPriority: 'high',
});
preload(backgroundHeaderMobile, {
  as: 'image',
  fetchPriority: 'high',
});

const StyledHeader = styled.header`
  position: sticky;
  display: grid;
  height: 100%;
  align-items: end;
  padding-inline: 1.5rem;
  border-radius: var(--btn-radius);
  overflow: hidden;
  padding-block: 3.875rem 1.5rem;
  box-shadow: var(--box-shadow);

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    items: center;
  }

  @media (max-width: 650px) {
    padding-block: 1rem;
    border-radius: 0;
    overflow: auto;
  }
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

  @media (max-width: 650px) {
    border-radius: 0;
  }
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
    color: var(--color-white);

    @media (max-width: 650px) {
      font-size: var(--fs-base);
    }
  }
  p {
    font-size: var(--fs-sm);
    line-height: var(--line-base);
    font-weight: 400;

    @media (max-width: 650px) {
      font-size: var(--fs-sm);
    }
  }
`;

const HamburgerButton = styled.button`
      background: none;
      border: none;
      cursor: pointer;
      display:none;
      @media (max-width: 650px) {
      display: block;
    `;

const SrOnly = styled.span`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;

  /* For iOS devices */
  user-select: none;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0.125rem;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CiLogoutStyled = styled(CiLogout)`
  width: 40px;
  height: 40px;
  color: var(--color-white);
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  z-index: 100;

  @media (max-width: 650px) {
    width: 25px;
    height: 25px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  z-index: 1;
`;

interface HeaderProps {
  isOpen: boolean;
  handleIsOpen: (isOpen: boolean) => void;
}
export default function Header({ isOpen, handleIsOpen }: HeaderProps) {
  const handleClick = () => {
    handleIsOpen(!isOpen);
  };

  const { user, logout } = useAuth();
  return (
    <StyledHeader>
      <picture>
        <source srcSet={backgroundHeaderMobile} media="(max-width: 500px)" />
        <source srcSet={backgroundHeaderTablet} media="(max-width: 1023px)" />
        <StyledImage
          width={255}
          height={135}
          fetchPriority="high"
          src={backgroundHeader}
        />
      </picture>
      {user && (
        <LogoutButton onClick={() => logout()}>
          <CiLogoutStyled width={80} height={80} />
        </LogoutButton>
      )}

      <HeaderWrapper>
        <StyledText>
          <h1>Frontend Mentor</h1>
          <p>Feedback Board</p>
        </StyledText>
        <HamburgerButton onClick={handleClick}>
          <SrOnly>Menu</SrOnly>
          <img
            width={20}
            height={17}
            src={!isOpen ? hamburgerIcon : closeMobileMenuIcon}
            alt=""
          />
        </HamburgerButton>
      </HeaderWrapper>
    </StyledHeader>
  );
}
