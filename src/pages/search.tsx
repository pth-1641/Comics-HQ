import { FunctionComponent } from 'preact';
import { useSearch } from '../hooks/useSearch';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'preact/hooks';
import ListStories from '../components/ListStories';

const Search: FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [searchStories, setSearchStories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getSearchStories(query ? query : '');
  }, [query]);

  const getSearchStories = async (query: string) => {
    const { stories, totalPages }: any = await useSearch({ query });
    setSearchStories(stories);
    setTotalPages(totalPages);
  };

  return (
    <>
      <ListStories stories={searchStories} title={`Tìm truyện: ${query}`} />
      {totalPages}
    </>
  );
};

export default Search;
