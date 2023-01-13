import axios from 'axios';
import { useState, useEffect } from 'preact/hooks';
import { crawlBaseUrl } from '../constants/env-variables';
import { NewlyUpdatedStories } from '../types';
import { compact } from 'lodash';

export const useLastUpdatedStories = (): NewlyUpdatedStories[] => {
  const [lastStories, setLastStories] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let headersList = {
        Accept: '*/*',
      };

      let reqOptions = {
        url: crawlBaseUrl,
        method: 'GET',
        headers: headersList,
      };

      let { data } = await axios.request(reqOptions);
      const text = data
        .split('<div class="row">')[2]
        .split('<ul class="pagination">')[0];
      const parser = new DOMParser();
      const doc: Document = parser.parseFromString(text, 'text/html');
      const lastestUpdatedStories = Array.from(
        doc.querySelectorAll('.item')
      ).map((el: Element) => {
        const thumbnail =
          'https:' + el.querySelector('img')?.getAttribute('data-original');
        const title = el.querySelector('h3 > a')?.textContent;
        const link = el
          .querySelector('h3 > a')
          ?.getAttribute('href')
          ?.split('/')
          .pop();
        const lastestChapter = el
          .querySelector('.comic-item li a')
          ?.textContent?.split(' ')[1];
        const shortDescription = el.querySelector('.box_text')?.textContent;
        const details = Array.from(el.querySelectorAll('.message_main p')).map(
          (node) => {
            const label = node.querySelector('label')?.textContent;
            const otherNames = label?.includes('Tên khác')
              ? node.textContent?.split(':')[1]
              : null;
            const genres = label?.includes('Thể loại')
              ? node.textContent?.split(':')[1].split(', ')
              : null;
            const author = label?.includes('Tác giả')
              ? node.textContent?.split(':')[1]
              : null;
            const status = label?.includes('Tình trạng')
              ? node.textContent?.split(':')[1]
              : null;
            return otherNames
              ? { otherNames }
              : genres
              ? { genres }
              : author
              ? { author }
              : status
              ? { status }
              : null;
          }
        );
        const updatedAt = el
          .querySelector('.message_main p:last-child')
          ?.textContent?.split(':')[1];
        const [views, comments, likes]: any = el
          .querySelector('.view span')
          ?.textContent?.replace(/\n/g, '')
          .trim()
          .split('  ');

        const isTrending = Boolean(el.querySelector('.icon-hot'));
        return {
          thumbnail,
          views,
          likes,
          title,
          comments: parseFloat(comments),
          link,
          shortDescription,
          details: compact(details),
          updatedAt,
          isTrending,
          lastestChaper:
            typeof lastestChapter === 'number' ? parseFloat(lastestChapter) : 0,
        };
      });
      setLastStories(lastestUpdatedStories);
    })();
  }, []);

  return lastStories;
};
