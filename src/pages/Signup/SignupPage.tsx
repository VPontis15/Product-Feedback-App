import styled from 'styled-components';
import SignupForm from './components/SignupForm';
import { motion } from 'motion/react';
import { Link } from 'react-router';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--color-light-gray) 0%,
    var(--color-gray) 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(173, 31, 234, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(60px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(70, 97, 230, 0.08) 0%,
      transparent 70%
    );
    border-radius: 50%;
    filter: blur(40px);
  }
`;

const StyledSignupPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 100svh;
  max-width: min(1440px, 90%);
  margin-inline: auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;

  .signup-form-wrapper {
    width: 100%;
    margin-inline: auto;
    display: grid;
    justify-items: center;
  }

  @media (max-width: 650px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const BrandSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 0.5rem;

  h1 {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    color: var(--color-dark-blue);
    margin-bottom: 0.5rem;
    background: linear-gradient(
      135deg,
      var(--color-purple) 0%,
      var(--color-blue) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: var(--fs-lg);
    color: var(--color-dark-gray);
    font-weight: 400;
    max-width: 450px;
    margin: 0 auto;
  }

  @media (max-width: 650px) {
    margin-bottom: 1rem;

    h1 {
      font-size: 1.75rem;
    }

    p {
      font-size: var(--fs-base);
    }
  }
`;

const FooterText = styled(motion.div)`
  text-align: center;
  margin-top: 2rem;

  p {
    color: var(--color-dark-gray);
    font-size: var(--fs-sm);

    a {
      color: var(--color-purple);
      text-decoration: none;
      font-weight: 600;

      &:hover {
        color: var(--color-purple-hover);
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 650px) {
    margin-top: 1rem;
  }
`;

export default function SignupPage() {
  return (
    <PageContainer>
      <StyledSignupPage>
        <BrandSection
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1>Join Product Feedback</h1>
          <p>
            Create an account and help shape the future of our products with
            your valuable insights
          </p>
        </BrandSection>

        <motion.div
          className="signup-form-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SignupForm />
        </motion.div>

        <FooterText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </FooterText>
      </StyledSignupPage>
    </PageContainer>
  );
}
