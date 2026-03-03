import { Link } from 'react-router-dom';
import commentIcon from '../../../src/assets/icons/comment-icon.svg';

export function CommentLinkButton({ article }) {
  //later on when I create single article view I will need to make sure to use id=comments

  const commentPath = `/p/${article.topic}/comments/${article.article_id}#comments`;

  return (
    <Link to={commentPath} className="comment-link-button">
      <img src={commentIcon} alt="comment-link-button" className="comment-link-button-icon" />
      <span className="comment-link-button-count">{article.comment_count}</span>
    </Link>
  );
}
