import styled from 'styled-components';
import FormInput from '../../NewSuggestion/components/FormInput';
import Button from '../../../components/Button';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useAuthContext } from '../../../context/authUtils';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 650px;
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
  padding: 2rem 2.5rem;
  width: 100%;

  .form-input-wrapper {
    position: relative;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 550px) {
      grid-template-columns: 1fr;
    }
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

    &.error {
      border-color: var(--color-red);
      background-color: #fee;
    }
  }

  .form-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-block-start: 0.5rem;
  }

  .image-upload {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .upload-area {
      border: 2px dashed var(--color-gray);
      border-radius: var(--btn-radius);
      padding: 2rem;
      text-align: center;
      transition: all 0.2s ease;
      cursor: pointer;
      background-color: var(--color-light-gray);

      &:hover,
      &.drag-over {
        border-color: var(--color-purple);
        background-color: rgba(173, 31, 234, 0.05);
      }

      .upload-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        .upload-icon {
          width: 3rem;
          height: 3rem;
          background-color: var(--color-purple);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;

          &::after {
            content: '+';
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
          }
        }

        p {
          color: var(--color-dark-gray);
          font-size: var(--fs-sm);
          margin: 0;

          &.primary {
            color: var(--color-dark-blue);
            font-weight: 600;
            margin-bottom: 0.25rem;
          }
        }
      }
    }

    .image-preview {
      position: relative;
      display: inline-block;
      max-width: 200px;

      img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: var(--btn-radius);
        border: 2px solid var(--color-gray);
      }

      .remove-image {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 24px;
        height: 24px;
        background-color: var(--color-red);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;

        &:hover {
          background-color: #dc2626;
        }
      }
    }

    input[type='file'] {
      display: none;
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

const SuccessMessage = styled(motion.div)`
  background-color: #f0f9ff;
  border: 1px solid var(--color-blue);
  border-radius: var(--btn-radius);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;

  p {
    color: var(--color-blue);
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

const ValidationError = styled.span`
  color: var(--color-red);
  font-size: var(--fs-xs);
  font-weight: 500;
  margin-top: 0.25rem;
  display: block;
`;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  avatar: File | null;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  avatar?: string;
}

export default function SignupForm() {
  const { signup, isSignupLoading, signupError } = useAuthContext();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatar: null,
  });
  const validateField = (
    name: keyof FormData,
    value: string | File | null
  ): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return !value || (typeof value === 'string' && value.trim().length < 2)
          ? 'Must be at least 2 characters'
          : '';

      case 'email': {
        if (!value || typeof value !== 'string') return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? 'Please enter a valid email address'
          : '';
      }

      case 'username':
        if (!value || typeof value !== 'string') return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value))
          return 'Username can only contain letters, numbers, and underscores';
        return '';

      case 'password':
        if (!value || typeof value !== 'string') return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';

      case 'confirmPassword':
        if (!value || typeof value !== 'string')
          return 'Please confirm your password';
        return value !== formData.password ? 'Passwords do not match' : '';

      case 'avatar':
        if (value && value instanceof File) {
          if (value.size > 5 * 1024 * 1024)
            return 'Image must be less than 5MB';
          if (!value.type.startsWith('image/'))
            return 'Please select a valid image file';
        }
        return '';

      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name as keyof FormErrors]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Clear general error when user starts typing
    if (error) setError('');
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const error = validateField('avatar', file);
      if (error) {
        setFieldErrors((prev) => ({ ...prev, avatar: error }));
        return;
      }

      setFormData((prev) => ({ ...prev, avatar: file }));
      setFieldErrors((prev) => ({ ...prev, avatar: '' }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, avatar: null }));
      setAvatarPreview(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDragEvents = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    handleDragEvents(e);
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    handleDragEvents(e);
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    handleDragEvents(e);
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, avatar: null }));
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const fieldKey = key as keyof FormData;
      const error = validateField(fieldKey, formData[fieldKey]);
      if (error) {
        errors[fieldKey] = error;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');    if (!validateForm()) {
      setError('Please fix the errors below');
      return;
    }    try {
      await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        avatar: formData.avatar,
      });

      setSuccess(
        'Account created successfully! Please check your email to verify your account.'
      );// Optionally navigate after a delay
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);

    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Signup failed. Please try again.'
      );
    }
  };

  // Show signup error from useAuth hook if it exists
  const displayError = error || signupError?.message;

  return (
    <FormContainer>
      <FormHeader>
        <h1>Create Account</h1>
        <p>Join our community and start sharing your feedback</p>
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

        {success && (
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p>{success}</p>
          </SuccessMessage>
        )}

        <div className="form-row">
          <div className="form-input-wrapper">
            <FormInput
              label="First Name"
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {fieldErrors.firstName && (
              <ValidationError>{fieldErrors.firstName}</ValidationError>
            )}
          </div>

          <div className="form-input-wrapper">
            <FormInput
              label="Last Name"
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {fieldErrors.lastName && (
              <ValidationError>{fieldErrors.lastName}</ValidationError>
            )}
          </div>
        </div>

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
          {fieldErrors.email && (
            <ValidationError>{fieldErrors.email}</ValidationError>
          )}
        </div>

        <div className="form-input-wrapper">
          <FormInput
            label="Username"
            description="Choose a unique username that others will see"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {fieldErrors.username && (
            <ValidationError>{fieldErrors.username}</ValidationError>
          )}
        </div>

        <div className="form-input-wrapper">
          <FormInput
            label="Password"
            description="Must be at least 6 characters"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {fieldErrors.password && (
            <ValidationError>{fieldErrors.password}</ValidationError>
          )}
        </div>

        <div className="form-input-wrapper">
          <FormInput
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {fieldErrors.confirmPassword && (
            <ValidationError>{fieldErrors.confirmPassword}</ValidationError>
          )}
        </div>

        <div className="form-input-wrapper">
          <div className="image-upload">
            <label>Profile Picture (Optional)</label>
            <p
              style={{
                fontSize: 'var(--fs-sm)',
                color: 'var(--color-dark-gray)',
                margin: '0 0 0.5rem 0',
              }}
            >
              Upload an avatar image (max 5MB)
            </p>

            {!avatarPreview ? (
              <div
                className={`upload-area ${dragOver ? 'drag-over' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEvents}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="upload-content">
                  <div className="upload-icon"></div>
                  <p className="primary">Click to upload or drag and drop</p>
                  <p>PNG, JPG, JPEG up to 5MB</p>
                </div>
              </div>
            ) : (
              <div className="image-preview">
                <img src={avatarPreview} alt="Avatar preview" />
                <button
                  type="button"
                  className="remove-image"
                  onClick={removeImage}
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />

            {fieldErrors.avatar && (
              <ValidationError>{fieldErrors.avatar}</ValidationError>
            )}
          </div>
        </div>

        <div className="form-actions">
          <StyledButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSignupLoading}
          >
            {isSignupLoading ? (
              <>
                <LoadingSpinner />
                <span>Creating Account...</span>
              </>
            ) : (
              'Create Account'
            )}
          </StyledButton>
        </div>
      </StyledForm>
    </FormContainer>
  );
}
