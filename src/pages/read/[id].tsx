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
        Referer: 'https://www.nettruyenup.com/',
      };
      const reqOptions = {
        url: proxyServer + images[0].imgSrc,
        method: 'GET',
        headers: headersList,
      };
      const res = await axios.request(reqOptions);
      console.log(res.data);
      // let headersList = {
      //   Accept: '*/*',
      // };
      // let reqOptions = {
      //   url: 'https://web-dev.imgix.net/image/admin/cXgqJfmD5OPdzqXl9RNt.jpg?auto=format',
      //   method: 'GET',
      //   headers: headersList,
      // };
      // let response = await axios.request(reqOptions);
      // a = response.data;
    })();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      {images?.map((image: { imgSrc: string }) => (
        <img src={proxyServer + image.imgSrc} alt='' draggable={false} />
      ))}
      <img src={a} alt='' />
    </div>
  );
}

export default ReadChapter;
