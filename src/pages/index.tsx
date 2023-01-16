import { useStories } from '../hooks/useStories';
import ListStories from '../components/ListStories';
import { crawlBaseUrl } from '../constants/env-variables';

function Home() {
  const hotStories = useStories(`${crawlBaseUrl}/hot`);
  const newlyStories = useStories(crawlBaseUrl);

  return (
    <>
      <ListStories
        title='Truyện HOT'
        stories={hotStories.stories}
        browseLink='/hot-stories'
      />
      <span className='mt-16 inline-block'></span>
      <ListStories
        title='Truyện mới cập nhật'
        stories={newlyStories.stories}
        browseLink='/newly-updated'
      />
    </>
  );
}

export default Home;
