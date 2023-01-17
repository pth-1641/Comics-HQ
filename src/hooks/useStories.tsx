import axios from 'axios';
import { useState, useEffect } from 'preact/hooks';
import { Story } from '../types';
import { compact, fromPairs, map } from 'lodash';
import { proxyServer } from '../constants/env-variables';

export const useStories = (
  url: string
): { stories: any; totalPages: number } => {
  const [stories, setStories] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

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
              ? node.textContent?.split(':')[1].split(/[,;]/)
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
              ? { key: 'otherNames', value: otherNames }
              : genres
              ? { key: 'genres', value: genres }
              : author
              ? { key: 'author', value: author }
              : status
              ? { key: 'status', value: status }
              : null;
          }
        );
        const objDetail = fromPairs(
          map(compact(details), (i) => [i.key, i.value])
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
          comments,
          link,
          shortDescription,
          ...objDetail,
          updatedAt,
          isTrending,
          lastestChapter: lastestChapter ? parseFloat(lastestChapter) : 0,
        };
      });
      const pageText = data
        .split('<ul class="pagination">')[1]
        .split("<li class='active'>")[0];
      const pageDoc: Document = parser.parseFromString(pageText, 'text/html');
      const pageNumber = pageDoc
        .querySelector('.hidden')
        ?.textContent?.split('/')[1]
        .trim();
      setTotalPages(pageNumber ? parseInt(pageNumber) : 0);
      setStories(lastestUpdatedStories);
    })();
  }, []);

  return { stories, totalPages };
};
