import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';
import { useShare } from '../../hooks/useShare';

export function ArticleCardHeader({ article, viewType }) {
  const articlePath = `/p/${article.topic}/comments/${article.article_id}`;

  const timeStamp = formatDistanceToNowStrict(article.created_at)
    .replace(' minutes', 'm')
    .replace(' hours', 'h')
    .replace(' days', 'd')
    .replace(' years', 'y');

  const titleClass = `article-card-header-title ${viewType === 'compact' ? 'article-card-header-title-compact' : ''}`;

  // I'm using my custom hook to obtain here a handle share function that I can call
  // when share button is clicked
  const { handleShare } = useShare();

  return (
    <header className="article-card-header">
      <div className="article-card-header-meta">
        <div className="article-card-header-topic-image-container">
          <img
            className="article-card-header-topic-image"
            src={article.topic_img_url}
            alt={article.topic}
          ></img>
        </div>
        <span className="article-card-header-topic-name">p/{article.topic}</span>
        <span className="article-card-header-time-stamp">{timeStamp}</span>
        <button
          className="article-card-header-more-btn"
          type="button"
          onClick={() => handleShare(article.title, `${window.location.origin}${articlePath}`)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* math for share icon */}
            <circle cx="18" cy="5" r="3">
              {' '}
            </circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>
      </div>
      <Link to={articlePath} className="article-card-header-title-link">
        <h2 className={titleClass}>{article.title}</h2>
      </Link>
    </header>
  );
}
