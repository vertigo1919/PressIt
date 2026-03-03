import { ArticleHeader } from './ArticleHeader';
import { ArticleBody } from './ArticleBody';
import { ArticleFooter } from './ArticleFooter';

export function ArticleDetail({ article }) {
  return (
    <article className="article-detail-main">
      <ArticleHeader article={article} />
      <ArticleBody article={article} />
      <ArticleFooter article={article} />
    </article>
  );
}
