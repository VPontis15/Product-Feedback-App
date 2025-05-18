import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100svh - 220px);
  width: 100%;
  color: var(--color-dark-blue);
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding: 2rem;

  @media (max-width: 650px) {
    top: 30px;
    height: calc(100svh - 10rem);
    padding: 0;
    margin-block-start: 2rem;
    border-radius: 0;
  }
`;

const StyledLoader = styled.div`
  width: 60px;
  height: 50px;
  --m: no-repeat linear-gradient(90deg, var(--color-cyan) 70%, transparent 0);
  -webkit-mask: var(--m) calc(0 * 100% / 4) 100% / calc(100% / 5)
      calc(1 * 100% / 5),
    var(--m) calc(1 * 100% / 4) 100% / calc(100% / 5) calc(2 * 100% / 5),
    var(--m) calc(2 * 100% / 4) 100% / calc(100% / 5) calc(3 * 100% / 5),
    var(--m) calc(3 * 100% / 4) 100% / calc(100% / 5) calc(4 * 100% / 5),
    var(--m) calc(4 * 100% / 4) 100% / calc(100% / 5) calc(5 * 100% / 5);
  background: linear-gradient(var(--color-cyan) 0 0) left/0% 100% no-repeat #ddd;
  animation: l14 2s infinite steps(6);

  @keyframes l14 {
    100% {
      background-size: 120% 100%;
    }
  }
`;

interface LoaderProps {
  className?: string;
  fullscreen?: boolean;
}

/**
 * A reusable loading indicator component
 * @param {object} props - Component props
 * @param {string} [props.className] - Optional class name for styling
 * @param {boolean} [props.fullscreen] - Whether to display the loader in a fullscreen wrapper
 * @returns {JSX.Element} - Rendered component
 */
export default function Loader({ className, fullscreen = true }: LoaderProps) {
  if (fullscreen) {
    return (
      <LoadingWrapper className={className}>
        <StyledLoader />
      </LoadingWrapper>
    );
  }

  return <StyledLoader className={className} />;
}
