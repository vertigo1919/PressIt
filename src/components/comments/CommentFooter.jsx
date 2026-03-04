import { VoteControl } from '../shared/VoteControl';
import { DeleteButton } from './DeleteButton';
export function CommentFooter({ comment }) {
  return (
    <footer className="comment-footer">
      <menu className="comment-footer-buttons">
        <VoteControl
          id={comment.comment_id}
          votes={comment.votes}
          userVote={comment.user_vote}
          type="comment"
        />
        <DeleteButton />
      </menu>
    </footer>
  );
}
