import { useParams } from 'react-router-dom';
import { crawlBaseUrl, imageProxyServer } from '../../constants/env-variables';
import { useStoryPics } from '../../hooks/useStoryPics';

function ReadChapter() {
  const { name, chapter, slug } = useParams();
  const images = useStoryPics(
    `${crawlBaseUrl}/truyen-tranh/${name}/${chapter}/${slug}`
  );

  return (
    <div className='flex flex-col items-center'>
      {images?.map(({ imgSrc }: { imgSrc: string }) => {
        return (
          <img
            src={`${imageProxyServer}?file=${imgSrc}`}
            alt=''
            draggable={false}
          />
        );
      })}
    </div>
  );
}

export default ReadChapter;
