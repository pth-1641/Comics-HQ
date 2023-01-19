import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { crawlBaseUrl } from '../../constants/env-variables';
import { useStoryPics } from '../../hooks/useStoryPics';

function ReadChapter() {
  const { name, chapter, slug } = useParams();
  const images = useStoryPics(
    `${crawlBaseUrl}/truyen-tranh/${name}/${chapter}/${slug}`
  );

  useEffect(() => {
    (async () => {
      let headersList = {
        Accept: '*/*',
        Referer: crawlBaseUrl,
      };

      let reqOptions = {
        url: 'https://corsproxy.io/?https://i333.ntcdntempv3.com/data/images/65000/875574/001.jpg',
        method: 'GET',
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      console.log(response.data);
    })();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      {/* {images?.map((image: { imgSrc: string }) => (
        <img src={image.imgSrc} alt='' draggable={false} />
      ))} */}
      <img src='' alt='' />
    </div>
  );
}

export default ReadChapter;
