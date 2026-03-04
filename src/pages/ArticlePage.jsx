import { ArticleDetail } from '../components/articles/ArticleDetail';
import { CommentsList } from '../components/comments/CommentsList';
import { CommentComposer } from '../components/comments/CommentComposer';
import { getArticleById, getCommentsByArticleId } from '../api';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorBanner } from '../components/shared/ErrorBanner';
import { useUser } from '../contexts/UserContext';

export function ArticlePage() {
  const { article_id } = useParams();
  const { user } = useUser();

  const {
    data: article,
    isLoading: articleIsLoading,
    error: articleError,
  } = useFetch(getArticleById, {
    params: [article_id, user.username],
    dependencies: [article_id, user.username],
  });

  const {
    data: comments,
    isLoading: commentsAreLoading,
    error: commentsError,
  } = useFetch(getCommentsByArticleId, {
    params: [article_id, user.username],
    dependencies: [article_id, user.username],
  });

  return (
    <section className="article-page-main">
      {articleIsLoading && <LoadingSpinner />}
      {articleError && <ErrorBanner message={articleError.message} />}
      {article && <ArticleDetail article={article} />}

      {commentsAreLoading && <LoadingSpinner />}
      {commentsError && <ErrorBanner message={commentsError.message} />}
      {comments && <CommentsList id="comments" comments={comments} />}

      <CommentComposer article_id={article_id} />
    </section>
  );
}
