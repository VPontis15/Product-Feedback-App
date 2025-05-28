import { useMemo } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Button from '../../../components/Button';
import suggestionsIcon from '../../../assets/suggestions/icon-suggestions.svg';

// Define enum for sort options for better type safety
export enum SortOptionValue {
  MOST_UPVOTES = 'most_upvotes',
  LEAST_UPVOTES = 'least_upvotes',
  MOST_COMMENTS = 'most_comments',
  LEAST_COMMENTS = 'least_comments',
}

// Define interface for sort option
interface SortOption {
  value: SortOptionValue;
  label: string;
  column: 'upvotes' | 'comment_count' | 'like_count';
  order: 'asc' | 'desc';
}

// Create a constant array of all sort options with their properties
export const SORT_OPTIONS: SortOption[] = [
  {
    value: SortOptionValue.MOST_UPVOTES,
    label: 'Most Likes',
    column: 'like_count',
    order: 'desc',
  },
  {
    value: SortOptionValue.LEAST_UPVOTES,
    label: 'Least Likes',
    column: 'like_count',
    order: 'asc',
  },
  {
    value: SortOptionValue.MOST_COMMENTS,
    label: 'Most Comments',
    column: 'comment_count',
    order: 'desc',
  },
  {
    value: SortOptionValue.LEAST_COMMENTS,
    label: 'Least Comments',
    column: 'comment_count',
    order: 'asc',
  },
];

const StyledSuggestionsHeader = styled.header`
  display: flex;
  background-color: var(--color-black);
  align-self: start;
  justify-content: space-between;
  color: var(--color-white);
  align-items: center;
  border-radius: var(--btn-radius);
  padding-block: 1.5rem;
  padding-inline: 1.5rem 1rem;
  width: 100%;
  box-shadow: var(--box-shadow);

  @media (max-width: 650px) {
    padding-block: 0.5rem;
    border-radius: 0;
    margin-block-end: 2rem;
    position: sticky;
    max-width: 100%;
  }

  section {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  section > div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    @media (max-width: 650px) {
      display: none;
    }
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-inline-end: 1rem;
  }
  div + form {
    margin-inline: 2.125rem;

    @media (max-width: 650px) {
      margin-inline: 0;
    }
  }

  h2 {
    color: var(--color-white);
  }

  h2,
  span {
    font-size: var(--fs-lg);
    line-height: var(--line-heading);
    font-weight: 700;
  }
  form {
    font-size: var(--fs-sm);
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  label {
    font-size: var(--fs-xs);
  }
  select {
    background: none;
    color: var(--color-white);
    border: none;
    font-weight: 700;
    font-size: var(--fs-xs);
  }
`;

interface SuggestionsHeaderProps {
  count: number;
  sortBy: SortOptionValue;
  onSortChange: (option: SortOptionValue) => void;
}

export default function SuggestionsHeader({
  count,
  sortBy,
  onSortChange,
}: SuggestionsHeaderProps) {
  // Find the current selected option
  const selectedOption = useMemo(
    () =>
      SORT_OPTIONS.find((option) => option.value === sortBy) || SORT_OPTIONS[0],
    [sortBy]
  );

  // Handle sort change
  const handleSortChange = (option: SortOption | null) => {
    if (option) {
      onSortChange(option.value);
    }
  };

  return (
    <StyledSuggestionsHeader>
      <section>
        <div>
          <img src={suggestionsIcon} alt="" />
          <span>{count}</span>
          <h2>Suggestions</h2>
        </div>

        <form action="">
          <label htmlFor="sort_by">Sort by:</label>
          <Select
            options={SORT_OPTIONS}
            defaultValue={SORT_OPTIONS[0]}
            isSearchable={false}
            value={selectedOption}
            onChange={handleSortChange}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-white)',
                border: 'none',
                boxShadow: 'none',
                fontSize: 'var(--fs-xs)',
                fontWeight: 700,
                cursor: 'pointer',
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'var(--color-white)',
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-black)',
                border: 'none',
                boxShadow: 'none',
              }),
              option: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                backgroundColor: 'none',
                color: isFocused
                  ? 'var(--color-purple-hover)'
                  : 'var(--color-dark-blue)',
                fontSize: 'var(--fs-xs)',
                fontWeight: 700,
                borderBottom: '1px solid var(--color-gray)',
              }),
            }}
          />
        </form>
      </section>
      <Button to="/feedback/new" variant="primary">
        + Add Feedback
      </Button>
    </StyledSuggestionsHeader>
  );
}
