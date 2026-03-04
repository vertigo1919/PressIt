export function CommentBody({ comment }) {
  return (
    <div className="comment-body">
      <p className="comment-body-main"> {comment.body} </p>
    </div>
  );
}
