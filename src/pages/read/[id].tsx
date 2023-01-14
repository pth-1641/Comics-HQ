import { useStoryPics } from '../../hooks/useStoryPics';
import { crawlBaseUrl } from '../../constants/env-variables';
import { useParams } from 'react-router-dom';

function ReadChapter() {
  const { name, chapter, slug } = useParams();
  const images = useStoryPics(
    `${crawlBaseUrl}/truyen-tranh/${name}/${chapter}/${slug}`
  );

  console.log(images);

  return (
    <div className='flex flex-col items-center'>
      {images?.map((image) => (
        <img src={image.imgSrc} alt='' draggable={false} />
      ))}
    </div>
  );
}

export default ReadChapter;
