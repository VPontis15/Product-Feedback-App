import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  border-left: 4px solid var(--color-red);
  padding: 1rem 1.5rem;
  width: 100%;
  margin: 0.75rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ErrorText = styled.p`
  color: var(--color-dark-blue);
  font-size: var(--fs-base);
  font-weight: 500;
  text-align: center;

  strong {
    color: var(--color-red);
    font-weight: 700;
  }
`;

const ErrorIcon = styled.span`
  color: var(--color-red);
  margin-right: 0.75rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  return (
    <ErrorContainer className={className}>
      <ErrorIcon aria-hidden="true">!</ErrorIcon>
      <ErrorText>
        <strong>Error:</strong> {message}
      </ErrorText>
    </ErrorContainer>
  );
}
