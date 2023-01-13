import axios from 'axios';
import { useState, useEffect } from 'preact/hooks';
import {
  crawlBaseUrl,
  thirdPartyName,
  thirdPartyUrl,
} from '../constants/env-variables';
import { HotStories } from '../types';

export const useHotStories = (): HotStories[] | undefined => {
  const [hotStories, setHotStories] = useState<any>();

  useEffect(() => {
    (async () => {
      let headersList = {
        Accept: '*/*',
        'User-Agent': `${thirdPartyName} (${thirdPartyUrl})`,
      };

      let reqOptions = {
        url: crawlBaseUrl,
        method: 'GET',
        headers: headersList,
      };

      let { data } = await axios.request(reqOptions);
      const text = data
        .split('<div class="owl-carousel clearfix">')[1]
        .split('<a href="#" class="prev" aria-label="Trước">')[0];
      const parser = new DOMParser();
      const doc: Document = parser.parseFromString(text, 'text/html');
      const hotStories = Array.from(doc.querySelectorAll('.item')).map(
        (el: Element) => {
          const thumbnail =
            'https:' + el.querySelector('img')?.getAttribute('data-src');
          const title = el.querySelector('h3 > a')?.textContent;
          const link = el
            .querySelector('a')
            ?.getAttribute('href')
            ?.replace(crawlBaseUrl, '');
          const lastestChaper = el.querySelector('h3 + a')?.textContent;
          const updatedAt = el
            .querySelector('.time')
            ?.textContent?.replace(/\n/g, '')
            .trim();
          return { thumbnail, title, link, lastestChaper, updatedAt };
        }
      );
      setHotStories(hotStories);
    })();
  }, []);

  return hotStories;
};
