import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { proxyServer } from '../constants/env-variables';

export const useChapter = (url: string) => {
  const [images, setImages] = useState<any>();
  const [comicId, setComicId] = useState(0);
  const [comicName, setComicName] = useState('');

  useEffect(() => {
    (async () => {
      const headersList = {
        Accept: '*/*',
      };

      const reqOptions = {
        url: proxyServer + url,
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
          const imgSrc =
            'https:' +
            image.querySelector('img')?.getAttribute('data-original');
          return imgSrc;
        }
      );
      const headerText = data
        .split('<html id="ctl00_Html1" lang="vi">')[1]
        .split('<body')[0];
      const headDoc = parser.parseFromString(headerText, 'text/html');
      const id = headDoc
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content')
        ?.split('/')
        .pop()
        ?.split('.')[0];
      const title = headDoc
        .querySelector('title')
        ?.textContent?.split('Chap')[0];
      setComicName(String(title));
      setComicId(Number(id));
      setImages(images.slice(1));
    })();
  }, [url]);

  return { images, comicId, comicName };
};
