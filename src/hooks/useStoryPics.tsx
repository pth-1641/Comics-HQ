import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';

export const useStoryPics = (url: string) => {
  const [storyPics, setStoryPics] = useState<any>();

  useEffect(() => {
    (async () => {
      let headersList = {
        Accept: '*/*',
      };

      const reqOptions = {
        url: url,
        method: 'GET',
        headers: headersList,
      };

      const { data } = await axios.request(reqOptions);
      const text = data
        .split('<div class="reading-detail box_doc">')[1]
        .split('<div class="container">')[0];
      const parser = new DOMParser();
      const doc: Document = parser.parseFromString(text, 'text/html');
      const images = Array.from(doc.querySelectorAll('div.page-chapter')).map(
        (image: Element) => {
          const pageIndex = image
            .querySelector('img')
            ?.getAttribute('data-index');
          const imgSrc =
            'https:' +
            image.querySelector('img')?.getAttribute('data-original');
          return {
            pageIndex,
            imgSrc,
          };
        }
      );
      setStoryPics(images.slice(1));
    })();
  }, []);

  return storyPics;
};
