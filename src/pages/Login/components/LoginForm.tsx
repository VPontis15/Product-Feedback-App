import styled from 'styled-components';
import FormInput from '../../NewSuggestion/components/FormInput';
import Button from '../../../components/Button';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuthContext } from '../../../context/authUtils';
import { useNavigate, useLocation } from 'react-router-dom';

const FormContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const FormHeader = styled.div`
  background: linear-gradient(
    135deg,
    var(--color-purple) 0%,
    var(--color-blue) 100%
  );
  padding: 3rem 2.5rem 2rem;
  color: var(--color-white);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    filter: blur(40px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -20%;
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    filter: blur(30px);
  }

  h1 {
    font-size: var(--fs-xxl);
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--color-white);
    position: relative;
    z-index: 1;
  }

  p {
    font-size: var(--fs-base);
    opacity: 0.9;
    position: relative;
    z-index: 1;
    font-weight: 400;
  }
`;
const StyledButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;
const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem 2.5rem;
  width: 100%;

  .form-input-wrapper {
    position: relative;
  }

  input {
    width: 100%;
    background-color: var(--color-light-gray);
    border: 1px solid transparent;
    border-radius: var(--btn-radius);
    padding: 1rem 1.25rem;
    font-size: var(--fs-base);
    font-family: inherit;
    transition: all 0.2s ease;
    color: var(--color-dark-blue);

    &:focus {
      outline: none;
      border-color: var(--color-purple);
      background-color: var(--color-white);
      box-shadow: 0 0 0 3px rgba(173, 31, 234, 0.1);
    }

    &::placeholder {
      color: var(--color-dark-gray);
      font-weight: 400;
    }
  }

  .form-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-block-start: 0.25rem;
  }

  .forgot-password {
    text-align: center;
    margin-block-start: 0.25rem;

    a {
      color: var(--color-purple);
      text-decoration: none;
      font-size: var(--fs-sm);
      font-weight: 600;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-purple-hover);
      }
    }
  }

  .divider {
    display: flex;
    align-items: center;

    text-align: center;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--color-gray);
    }

    span {
      padding: 0 1rem;
      color: var(--color-dark-gray);
      font-size: var(--fs-sm);
      font-weight: 500;
    }
  }

  .demo-login {
    text-align: center;
    padding: 1.75rem 1.5rem;
    background-color: var(--color-gray);
    border-radius: var(--btn-radius);
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    p {
      color: var(--color-dark-gray);
      font-size: var(--fs-sm);
      margin-bottom: 0.5rem;
    }

    .demo-credentials {
      display: grid;
      gap: 0.5rem;
      justify-items: start;
    }

    small {
      color: var(--color-dark-blue);
      font-weight: 600;
      font-size: var(--fs-xs);
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  background-color: #fee;
  border: 1px solid var(--color-red);
  border-radius: var(--btn-radius);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;

  p {
    color: var(--color-red);
    font-size: var(--fs-sm);
    font-weight: 500;
    margin: 0;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function LoginForm() {
  const { login, isLoginLoading, loginError } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const from = location.state?.from?.pathname || '/';
  const userPassword =
    import.meta.env.VITE_TEST_USER_PASSWORD || 'defaultpassword';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      }); // Navigate after successful login
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials and try again.';
      setError(errorMessage);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await login({
        email: 'testuser@gmail.com',
        password: userPassword,
      });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Demo login failed.';
      setError(errorMessage);
    }
  };

  // Show login error from useAuth hook if it exists
  const displayError = error || loginError?.message;

  return (
    <FormContainer>
      <FormHeader>
        <h1>Welcome Back</h1>
        <p>Sign in to your account to continue</p>
      </FormHeader>

      <StyledForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {displayError && (
          <ErrorMessage
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p>{displayError}</p>
          </ErrorMessage>
        )}

        <div className="form-input-wrapper">
          <FormInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input-wrapper">
          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <StyledButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoginLoading}
          >
            {isLoginLoading ? (
              <>
                <LoadingSpinner />
                <span>Signing In...</span>
              </>
            ) : (
              'Sign In'
            )}
          </StyledButton>
        </div>

        <div className="demo-login">
          <p>Try the demo account:</p>

          <Button
            type="button"
            variant="secondary"
            size="base"
            onClick={handleDemoLogin}
            disabled={isLoginLoading}
          >
            {isLoginLoading ? 'Logging in...' : 'Fill Demo Credentials'}
          </Button>
        </div>
      </StyledForm>
    </FormContainer>
  );
}
