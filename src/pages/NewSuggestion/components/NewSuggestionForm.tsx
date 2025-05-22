import styled from 'styled-components';
import FormInput from './FormInput';
import Button from '../../../components/Button';
import StyledSelect, { type SelectOption } from './StyledSelect';
import { useMutation, useQuery } from '@tanstack/react-query';
import supabase from '../../../api/supabase';
import newFeedBackIcon from '../../../assets/shared/icon-new-feedback.svg';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';

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
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    detail: '',
  });

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(
    null
  );

  const handleFormData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (option: SelectOption | null) => {
    setSelectedCategory(option);

    setFormData((prevData) => ({
      ...prevData,
      category: option ? option.value : '',
    }));
  };

  // Fetch categories from the database
  const { data: categories } = useQuery({
    queryKey: ['categories'],

    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('category')
          .select('id,category');
        if (error) {
          throw new Error(error.message);
        }
        return data || [];
      } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
    },
  });

  const selectCategories: SelectOption[] = useMemo(
    () =>
      categories?.map((category) => ({
        value: category.id,
        label: category.category,
      })) || [],
    [categories]
  );

  // Set default category if none is selected
  // This effect will run when the component mounts or when selectCategories changes
  useEffect(() => {
    if (selectCategories.length > 0 && !selectedCategory) {
      const defaultCategory = selectCategories[0];
      setSelectedCategory(defaultCategory);
      setFormData((prev) => ({
        ...prev,
        category: defaultCategory.value,
      }));
    }
  }, [selectCategories, selectedCategory]);

  const { data: status_id } = useQuery({
    queryKey: ['SuggestionStatus'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('status')
          .select('id')
          .eq('update_status', 'Suggestion');
        if (error) {
          throw new Error(error.message);
        }
        return data || [];
      } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
    },
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true, // Only fetch once when component mounts
    refetchOnReconnect: false, // Don't refetch on reconnect
  });

  // Mutation to create new feedback
  // This mutation will be triggered when the form is submitted
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (newFeedback: {
      title: string;
      category_id: number;
      upvotes: number;
      slug: string;
    }) => {
      try {
        const { data, error } = await supabase
          .from('feedback')
          .insert(newFeedback);
        if (error) {
          throw new Error(error.message);
        }
        return data;
      } catch (error) {
        console.error('Error creating feedback:', error);
      }
    },
    onSuccess: () => {
      navigate('/');
    },
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFeedback = {
      title: formData.title,
      category_id: +formData.category,
      update_status_id: status_id?.[0]?.id || null,
      description: formData.detail,
      upvotes: 0,
      slug: formData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, ''),
    };
    if (
      !newFeedback.title ||
      !newFeedback.category_id ||
      status_id?.[0]?.id === null
    ) {
      return;
    }
    mutate(newFeedback);
  };

  return (
    <>
      <FormWrapper>
        <NewFeedbackIcon
          width={56}
          height={56}
          src={newFeedBackIcon}
          alt="New Feedback Icon"
        />
        <h1>Create New Feedback</h1>
        <Form onSubmit={handleSubmit}>
          <FormInput
            isTextarea
            name="title"
            id="title"
            label="Feedback Title"
            description="Add a short, descriptive headline"
            value={formData.title}
            required
            onChange={handleFormData}
          />
          <FormInput
            name="category"
            id="category"
            label="Category"
            description="Choose a category for your feedback"
          >
            <StyledSelect
              value={selectedCategory || undefined}
              onChange={handleCategoryChange}
              defaultOption={selectCategories[0]}
              options={selectCategories.length > 0 ? selectCategories : []}
            />
          </FormInput>
          <FormInput
            rows={5}
            isTextarea
            name="detail"
            id="detail"
            label="Feedback Detail"
            value={formData.detail}
            onChange={handleFormData}
            description="Include any specific comments on what should be improved, added, etc."
          />

          <div>
            <Button type="reset" variant="tertiary">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isPending ? 'Creating...' : 'Add Feedback'}
            </Button>
          </div>
        </Form>
      </FormWrapper>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </>
  );
}
