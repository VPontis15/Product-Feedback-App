import { Link } from 'react-router';
import styled from 'styled-components';
import { css } from 'styled-components';

const StyledButton = styled.button<{
  $variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'filter' | 'text';
  $size?: 'sm' | 'base' | 'lg' | 'xl' | 'filter';
  $isActive?: boolean;
  $isLoading?: boolean;
}>`
  background: transparent;
  border-radius: var(--btn-radius);
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  /* Size variations */
  ${(props) =>
    props.$size === 'filter' &&
    css`
      padding: 0.45rem 0.76rem;
      font-size: 0.875rem;

      @media (max-width: 768px) {
        padding: 0.36rem 0.61rem; /* 80% of original padding */
        font-size: 0.7rem; /* 80% of original font size */
      }
    `}
  ${(props) =>
    props.$size === 'sm' &&
    css`
      padding: 0.85rem 1rem;
      font-size: 0.875rem;

      @media (max-width: 768px) {
        padding: 0.68rem 0.8rem; /* 80% of original padding */
        font-size: 0.7rem; /* 80% of original font size */
      }
    `}

  ${(props) =>
    props.$size === 'base' &&
    css`
      padding: 0.85rem 1.55rem;
      font-size: var(--fs-sm);

      @media (max-width: 1024px) {
        padding: 0.72rem 1.32rem; /* 85% of original padding */
      }

      @media (max-width: 768px) {
        padding: 0.85rem 1rem;
        font-size: var(--fs-sm);
      }
      @media (max-width: 650px) {
        font-size: var(--fs-xs);
      }
    `}

  ${(props) =>
    props.$size === 'lg' &&
    css`
      padding: 1rem 3.25rem;
      font-size: 1.125rem;

      @media (max-width: 1024px) {
        padding: 0.9rem 2.75rem;
      }

      @media (max-width: 768px) {
        padding: 0.8rem 2.25rem;
        font-size: var(--fs-base);
      }
    `}

  ${(props) =>
    props.$size === 'xl' &&
    css`
      padding: 1.2rem 3.75rem;
      font-size: 1.25rem;

      @media (max-width: 1024px) {
        padding: 1.1rem 3.25rem;
      }

      @media (max-width: 768px) {
        padding: 1rem 2.75rem;
        font-size: var(--fs-lg);
      }
    `}

  /* Variant variations */
  ${(props) =>
    props.$variant === 'primary' &&
    css`
      background: var(--color-purple);
      color: white;
      &:hover {
        background: var(--color-purple-hover);
      }
    `}

  ${(props) =>
    props.$variant === 'secondary' &&
    css`
      background: var(--color-blue);
      color: white;
      &:hover {
        background: var(--color-blue-hover);
      }
    `}

  ${(props) =>
    props.$variant === 'tertiary' &&
    css`
      background: var(--color-dark-blue);
      color: var(--color-white);
      &:hover {
        background: var(--color-dark-blue-hover);
      }
    `}

    ${(props) =>
    props.$variant === 'text' &&
    css`
      background: transparent;
      color: var(--color-blue);
      font-size: var(--fs-xs);
      &:hover {
        color: var(--color-blue-hover);
      }
    `}
    

    ${(props) =>
    props.$variant === 'error' &&
    css`
      background: var(--color-red);
      color: white;
      &:hover {
        background: var(--color-red-hover);
      }
    `}



    ${(props) =>
    props.$variant === 'filter' &&
    css`
      background: var(--color-light-gray);
      color: var(--color-blue);
      text-transform: capitalize;
      font-size: var(--fs-xxs);
    `}

    
    ${(props) =>
    props.$isActive &&
    css`
      background: var(--color-blue);
      color: white;
      &:hover {
        background: var(--color-blue);
      }
    `}
      
    ${(props) =>
    props.$isLoading &&
    css`
      background: var(--color-light-gray);
      color: var(--color-dark-blue);
      cursor: not-allowed;
      &:hover {
        background: var(--color-light-gray);
      }
    `}
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'filter' | 'text';
  to?: string;
  isActive?: boolean;
  isLoading?: boolean;
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'filter';
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export default function Button({
  children,
  to,
  variant = 'primary',
  size = 'base',
  isActive = false,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      as={to ? Link : 'button'}
      to={to}
      $isActive={isActive}
      $variant={variant}
      $size={size}
      $isLoading={isLoading}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
