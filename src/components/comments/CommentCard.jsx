import { CommentHeader } from './CommentHeader';
import { CommentBody } from './CommentBody';
import { CommentFooter } from './CommentFooter';

export function CommentCard({ comment }) {
  return (
    <article className="comment-card-main">
      <CommentHeader
        commentAuthorImageURL={comment.author_avatar_url}
        commentAuthor={comment.author}
        commentTimeStamp={comment.created_at}
      />
      <CommentBody comment={comment} />
      <CommentFooter comment={comment} />
    </article>
  );
}
