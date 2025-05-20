import styled from 'styled-components';
import Button from '../../../components/Button';
import Skeleton from '../../../components/Skeleton';

interface CommentProps {
  isLoading?: boolean;
  comment: {
    id: number;
    comment: string;
    parent_comment_id: number | null;
    feedback_id: number;

    user: {
      avatar_image_url: string;
      username: string;
      first_name: string;
      last_name: string;
    };
  };
  allComments?: Array<CommentProps['comment']>;
}

const CommentWrapper = styled.article`
  width: 100%;
  background-color: var(--color-white);

  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 2.5rem;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ButtonWrapper = styled.div`
  display: flex;
  items: end;
  gap: 0.5rem;
`;

const CommentDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  fontsize: var(--fs-sm);

  h3 {
    color: var(--color-dark-blue);
  }

  span {
    color: var(--color-dark-gray);
    font-weight: 400;
    line-height: 1.5rem;
  }
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  p {
    color: var(--color-dark-gray);
  }

  button {
    align-self: flex-start;
  }
`;
const Divider = styled.hr`
  color: var(--color-comment-divider);
  margin: 2rem 0;
`;

const RepliesContainer = styled.div`
  margin-block-start: 2rem;
  margin-inline-start: 1.5rem;
  position: relative;
  display: grid;
  gap: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: -1.25rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: var(--color-comment-divider);
  }
`;

const SkeletonAvatar = styled(Skeleton)`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const SkeletonText = styled(Skeleton)`
  height: 1rem;
  width: ${(props) => props.width || '100%'};
  margin-bottom: 0.5rem;
`;

const SkeletonComment = styled.div`
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 2.5rem;
  width: 100%;
`;

export default function Comment({
  comment,
  isLoading,
  allComments = [],
}: CommentProps) {
  if (isLoading) {
    return (
      <SkeletonComment>
        <SkeletonAvatar />
        <div>
          <SkeletonText width="30%" />
          <SkeletonText width="20%" />
          <SkeletonText width="90%" />
          <SkeletonText width="75%" />
        </div>
      </SkeletonComment>
    );
  }

  const { avatar_image_url, username, first_name, last_name } = comment.user;

  // Find replies to this comment
  const replies = allComments.filter(
    (reply) => reply.parent_comment_id === comment.id
  );

  // Find parent comment's user if this is a reply
  const parentUser = comment.parent_comment_id
    ? allComments.find((c) => c.id === comment.parent_comment_id)?.user
    : null;

  return (
    <>
      <CommentWrapper>
        <Avatar src={avatar_image_url} />

        <CommentContent>
          <CommentDetailsWrapper>
            <div>
              <h3>
                {first_name} {last_name}
              </h3>
              <span>@{username}</span>
            </div>
            <ButtonWrapper>
              <Button variant="text">Reply</Button>
            </ButtonWrapper>
          </CommentDetailsWrapper>
          <p>
            {parentUser && (
              <strong style={{ color: 'var(--color-blue)' }}>
                @{parentUser.username}{' '}
              </strong>
            )}
            {comment.comment}
          </p>
        </CommentContent>
      </CommentWrapper>

      {/* Render replies with indentation */}
      {replies.length > 0 && (
        <RepliesContainer>
          {...replies.map((reply) => (
            <Comment key={reply.id} comment={reply} allComments={allComments} />
          ))}
        </RepliesContainer>
      )}
      {replies.length > 0 && <Divider />}
    </>
  );
}
