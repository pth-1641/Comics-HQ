import { FunctionComponent } from 'preact';
import { useStories } from '../hooks/useStories';
import { useSearchParams } from 'react-router-dom';
import { crawlBaseUrl } from '../constants/env-variables';
import ListStories from '../components/ListStories';
import Pagination from '../components/Pagination';

const HotStories: FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const { stories, totalPages } = useStories(
    `${crawlBaseUrl}/hot?page=${page ? page : 1}`
  );

  return (
    <>
      <ListStories
        title={`Truyện HOT - Trang ${page ? page : 1}`}
        stories={stories}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={page ? parseInt(page) : 1}
      />
    </>
  );
};

export default HotStories;
