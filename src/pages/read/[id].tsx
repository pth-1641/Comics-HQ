import { useStoryPics } from '../../hooks/useStoryPics';
import { crawlBaseUrl, proxyServer } from '../../constants/env-variables';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'preact/hooks';

function ReadChapter() {
  const { name, chapter, slug } = useParams();
  const images = useStoryPics(
    `${crawlBaseUrl}/truyen-tranh/${name}/${chapter}/${slug}`
  );

  let a;

  useEffect(() => {
    (async () => {
      const headersList = {
        Accept: '*/*',
        // Referer: crawlBaseUrl,
      };
      const reqOptions = {
        url:
          proxyServer +
          'https://i221.ntcdntempv3.com/data/images/17696/361803/001.jpg?data=net',
        method: 'GET',
        headers: headersList,
      };
      const res = await axios.request(reqOptions);
      console.log(res);

      // const url = `data:${res.headers['content-type']};base64,${res.data}`;
      // const a = await fetch(url);
      // const blob = await a.blob();
      // console.log(blob);
    })();
  }, [images]);

  return (
    <div className='flex flex-col items-center'>
      {/* {images?.map((image: { imgSrc: string }) => (
        <img src={image.imgSrc} alt='' draggable={false} />
      ))} */}
      <img src={a} alt='' />
    </div>
  );
}

export default ReadChapter;
