import { formatDistanceToNowStrict } from 'date-fns';

export function CommentHeader({ commentAuthorImageURL, commentAuthor, commentTimeStamp }) {
  const timeStamp = formatDistanceToNowStrict(commentTimeStamp)
    .replace(' minutes', 'm')
    .replace(' hours', 'h')
    .replace(' days', 'd')
    .replace(' years', 'y');

  return (
    <header className="comment-header">
      <div className="comment-header-meta">
        <div className="comment-header-user-image-container">
          <img
            className="comment-header-user-image"
            src={commentAuthorImageURL}
            alt={commentAuthor}
          ></img>
          <span className="comment-header-user-name">u/{commentAuthor}</span>
          <span className="comment-header-separator"> · </span>
          <span className="comment-header-time-stamp">{timeStamp}</span>
        </div>
      </div>
    </header>
  );
}
