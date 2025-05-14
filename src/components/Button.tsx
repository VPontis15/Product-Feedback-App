import styled from 'styled-components';
import { css } from 'styled-components';

const StyledButton = styled.button<{
  $variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'filter';
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

  /* Size variations */
  ${(props) =>
    props.$size === 'filter' &&
    css`
      padding: 0.45rem 0.76rem;
      font-size: 0.875rem;
    `}
  ${(props) =>
    props.$size === 'sm' &&
    css`
      padding: 0.5rem 1.75rem;
      font-size: 0.875rem;
    `}

  ${(props) =>
    props.$size === 'base' &&
    css`
      padding: 0.78rem 2.68rem;
      font-size: 1rem;
    `}

  ${(props) =>
    props.$size === 'lg' &&
    css`
      padding: 1rem 3.25rem;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.$size === 'xl' &&
    css`
      padding: 1.2rem 3.75rem;
      font-size: 1.25rem;
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
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'filter';
  isActive?: boolean;
  isLoading?: boolean;
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'filter';
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'base',
  isActive = false,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
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
