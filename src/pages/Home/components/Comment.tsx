import styled from 'styled-components';
import Button from '../../../components/Button';

interface CommentProps {
  user: {
    name: string;
    image: string;
    username: string;
  };
  comment: string;
}

const CommentWrapper = styled.article`
  width: 100%;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding-inline: 2rem;
  padding-block: 1.75rem;
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 2rem;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--color-dark-blue);
`;

const Name = styled.h3`
  color: var(--color-dark-blue);
  font-size: var(--fs-xs);
`;
const Username = styled.p`
  color: var(--color-dark-gray);
  font-size: var(--fs-xs);
`;

const UserComment = styled.p`
  color: var(--color-dark-gray);
  font-size: var(--fs-sm);
  max-width: 75ch;
  line-height: var(--line-lg);
`;

const UserDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.0625rem;

  section {
    display: flex;
    justify-content: space-between;
  }
`;
export default function Comment({ user, comment }: CommentProps) {
  const { name, image, username } = user;
  return (
    <CommentWrapper>
      <Avatar src={image} alt={name} />
      <UserDetailsWrapper className="">
        <section>
          <div>
            <Name className="">{name}</Name>
            <Username className="">@{username}</Username>
          </div>
          <Button variant="text" size="sm">
            Reply{' '}
          </Button>
        </section>
        <UserComment className="">{comment}</UserComment>
      </UserDetailsWrapper>
    </CommentWrapper>
  );
}
