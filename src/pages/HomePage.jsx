import { FeedControls } from '../components/articles/FeedControls';
import { ArticleList } from '../components/articles/ArticleList';
import { useFetch } from '../hooks/useFetch';
import { getArticles } from '../api';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorBanner } from '../components/shared/ErrorBanner';
import { translateFilterLabel } from '../utils/translateFilterLabel';
import { useSearchParams } from 'react-router-dom';

export function HomePage() {
  //search params
  const [searchParams, setSearchParams] = useSearchParams();

  const sortLabel = searchParams.get('sort') ?? 'New';
  const viewType = searchParams.get('view') ?? 'extended';

  function setSortLabel(label) {
    setSearchParams({ sort: label, view: viewType });
  }

  function setViewType(type) {
    setSearchParams({ sort: sortLabel, view: type });
  }

  // translate menu label into query parameters
  const { sort_by, order } = translateFilterLabel(sortLabel);

  //use my fetch custom hook to call api when params change
  const {
    data: articles,
    isLoading,
    error,
  } = useFetch(getArticles, {
    params: [sort_by, order],
    dependencies: [sort_by, order],
  });

  return (
    <section className="home-page-main">
      {/* <h1>Home Page</h1> */}
      <FeedControls
        sortLabel={sortLabel}
        setSortLabel={setSortLabel}
        viewType={viewType}
        setViewType={setViewType}
      />

      {isLoading && <LoadingSpinner />}
      {/* in case of error I return the error component and passdown the message */}
      {error && <ErrorBanner message={error.message} />}
      {articles && <ArticleList articles={articles} viewType={viewType} />}
    </section>
  );
}
