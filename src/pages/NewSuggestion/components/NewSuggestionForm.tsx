import styled from 'styled-components';
import FormInput from './FormInput';
import Button from '../../../components/Button';
import StyledSelect from './StyledSelect';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../../api/supabase';
import newFeedBackIcon from '../../../assets/shared/icon-new-feedback.svg';

const FormWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 2.5rem;
  align-items: start;
  padding-block-start: 3.25rem;
  padding-block-end: 2.5rem;
  padding-inline: 2.625rem;
  border-radius: var(--btn-radius);
  box-shadow: var(--box-shadow);
  background-color: var(--color-white);

  h1 {
    text-transform: capitalize;
    font-size: var(--fs-xxl);
  }
`;

const Form = styled.form`
  display: grid;
  width: 100%;
  resize: vertical;
  gap: 1.5rem;

  div:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-block-start: 0.5rem;
  }
`;

const NewFeedbackIcon = styled.img`
  position: absolute;
  top: -1.625rem;
  left: 2.625rem;
  width: 3.5rem;
  height: 3.5rem;
`;

export default function NewSuggestionForm() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data: filters, error } = await supabase
          .from('category')
          .select('*');
        if (error) {
          throw new Error(error.message);
        }
        return filters;
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    },
  });

  const selectCategories =
    categories?.map((category) => {
      return {
        value: category.category.toLowerCase(),
        label: category.category,
      };
    }) || [];

  return (
    <FormWrapper>
      <NewFeedbackIcon
        width={56}
        height={56}
        src={newFeedBackIcon}
        alt="New Feedback Icon"
      />
      <h1>Create New Feedback</h1>
      <Form>
        <FormInput
          isTextarea
          name="title"
          id="title"
          label="Feedback Title"
          description="Add a short, descriptive headline"
        />
        <FormInput
          name="category"
          id="category"
          label="Category"
          description="Choose a category for your feedback"
        >
          <StyledSelect
            defaultOption={selectCategories[0]?.value}
            options={selectCategories}
          />
        </FormInput>
        <FormInput
          rows={5}
          isTextarea
          name="detail"
          id="detail"
          label="Feedback Detail"
          description="Include any specific comments on what should be improved, added, etc."
        />

        <div>
          <Button type="reset" variant="tertiary">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Feedback
          </Button>
        </div>
      </Form>
    </FormWrapper>
  );
}
