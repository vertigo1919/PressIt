import { VoteControl } from '../shared/VoteControl';
import { CommentLinkButton } from '../comments/CommentLinkButton';

export function ArticleFooter({ article }) {
  return (
    <footer className="article-footer-main">
      <VoteControl
        id={article.article_id}
        votes={article.votes}
        userVote={article.user_vote}
        type="article"
      />
      <CommentLinkButton article={article} />
    </footer>
  );
}
