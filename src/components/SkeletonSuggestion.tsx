import styled from 'styled-components';
import Skeleton from './Skeleton';

// Using the same wrapper as actual suggestions
const SkeletonWrapper = styled.article`
  width: 100%;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding-block: 1.5rem;
  padding-inline: 1.5rem;
  display: grid;
  grid-template-columns: 2.5rem 1fr 2.5rem;
  gap: 2.5rem;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

// Using the same content layout as actual suggestions
const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

// Skeleton for the heading text (title)
const SkeletonTextHeading = styled(Skeleton)`
  height: 1.6rem;
  width: 10rem;
  margin-bottom: 0.5rem;
`;

// Skeleton for the description text
const SkeletonTextDesc = styled(Skeleton)`
  height: 1rem;
  width: 20rem;
  margin-bottom: 0.5rem;
`;

// Skeleton for the reply button/count
const SkeletonTextReply = styled(Skeleton)`
  height: 1.5rem;
  width: 1.5rem;
`;

// Skeleton for the category button
const SkeletonCat = styled(Skeleton)`
  height: 2rem;
  width: 5rem;
  border-radius: var(--btn-radius);
`;

// Skeleton for the likes/upvotes button
const SkeletonLikes = styled(Skeleton)`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: start;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--btn-radius);
  padding-inline: 0.5rem;
  padding-block: 0.875rem 0.5rem;
  cursor: pointer;
  height: 3rem;
  width: 2.5rem;
`;

// Skeleton for the details wrapper
const SkeletonDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
`;

/**
 * A skeleton loading placeholder for a suggestion item
 * @returns {JSX.Element} - Rendered component
 */
const SkeletonSuggestion = (): JSX.Element => {
  return (
    <SkeletonWrapper>
      <SkeletonLikes />
      <SkeletonContent>
        <SkeletonDetailsWrapper>
          <div>
            <SkeletonTextHeading />
            <SkeletonTextDesc />
          </div>
          <SkeletonTextReply />
        </SkeletonDetailsWrapper>
        <SkeletonCat />
      </SkeletonContent>
    </SkeletonWrapper>
  );
};

export default SkeletonSuggestion;
