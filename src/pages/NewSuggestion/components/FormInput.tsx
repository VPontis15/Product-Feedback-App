import styled from 'styled-components';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  textarea {
    width: 100%;
    flex: 1;
    padding-block: 0.44rem;
    border: none;
  }

  textarea,
  input {
    background-color: var(--color-light-gray);
    padding-inline-start: 0.25rem;
    resize: none;
  }

  textarea:focus,
  input:focus {
    outline: none;
    border: 1px solid var(--color-blue);
  }

  label {
    color: var(--color-dark-blue);
    font-weight: 700;
    font-size: var(--fs-sm);
  }

  p {
    color: var(--color-dark-gray);
    font-size: var(--fs-sm);
  }
`;
interface FormInputProps {
  label: string;
  description: string;
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  isTextarea?: boolean;
  rows?: number;
  children?: React.ReactNode;
}
export default function FormInput({
  label,
  description,
  id,
  name,
  type = 'text',
  required = false,
  isTextarea = false,
  rows = 0,
  children,
}: FormInputProps) {
  return (
    <FormGroup>
      <div>
        <label htmlFor={id}>{label}</label>
        <p>{description}</p>
      </div>
      {!children &&
        (isTextarea ? (
          <textarea id={id} rows={rows} name={name} required={required} />
        ) : (
          <input id={id} name={name} type={type} required={required} />
        ))}
      {children}
    </FormGroup>
  );
}
