import styled from 'styled-components';
import Button from '../../../../components/Button';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../../../api/supabase';
import Skeleton from '../../../../components/Skeleton';
import ErrorMessage from '../../../../components/ErrorMessage';
import { useFiltersContext } from '../../../../context/filtersContext';

const FiltersWrapper = styled.div`
  display: none;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
  margin-inline: auto;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding-block: 1.5rem;
  padding-inline-start: 1.5rem;
  width: 100%;

  @media (max-width: 650px) {
    display: flex;
  }
`;

// Create a styled skeleton button
const SkeletonButton = styled(Skeleton)`
  width: 60px;
  height: 25px;
  border-radius: var(--btn-radius);
`;

export default function FiltersMobile() {
  const { setFilter, filter } = useFiltersContext();
  const handleFilterClick = (category: string) => {
    setFilter(category);
    // Reset the filter to 'All' if the same category is clicked again
    if (filter === category) {
      setFilter('All');
    }
  };
  const {
    data: filters,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['filters'],
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
  if (error) {
    return (
      <ErrorMessage>
        message={error.message || 'Something went wrong'}
      </ErrorMessage>
    );
  }

  return (
    <FiltersWrapper>
      <Button
        onClick={() => handleFilterClick('All')}
        isActive={filter === 'All'}
        variant="filter"
        size="filter"
      >
        All
      </Button>
      {isLoading
        ? // Render skeleton filter buttons when loading
          Array(5)
            .fill(0)
            .map((_, index) => (
              <SkeletonButton key={`skeleton-filter-${index}`} />
            ))
        : filters?.map((filterItem) => (
            <Button
              onClick={() => handleFilterClick(filterItem.category)}
              isActive={filterItem.category === filter}
              key={filterItem.id}
              variant="filter"
              size="filter"
            >
              {filterItem.category}
            </Button>
          ))}
    </FiltersWrapper>
  );
}
