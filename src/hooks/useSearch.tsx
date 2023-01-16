import axios from 'axios';
import { compact, fromPairs, map } from 'lodash';
import { crawlBaseUrl, proxyServer } from '../constants/env-variables';

interface Input {
  query?: string;
  page?: number;
}

export const useSearch = async ({ query, page = 1 }: Input) => {
  if (!query) return;

  const headersList = {
    Accept: '*/*',
  };

  const reqOptions = {
    url: `${
      proxyServer + crawlBaseUrl
    }/tim-truyen?keyword=${query}&page=${page}`,
    method: 'GET',
    headers: headersList,
  };

  const { data } = await axios.request(reqOptions);
  const text = data.split('<div class="items">')[1].split('Module-283')[0];
  const parser = new DOMParser();
  const doc: Document = parser.parseFromString(text, 'text/html');
  const stories = Array.from(doc.querySelectorAll('.item')).map(
    (story: Element) => {
      const thumbnail =
        'https:' + story.querySelector('img')?.getAttribute('data-original');
      const title = story.querySelector('.title')?.textContent;
      const [views, comments, likes]: any = story
        .querySelector('.pull-left')
        ?.textContent?.replace(/\n/g, '')
        .trim()
        .split('  ');
      const link = story
        .querySelector('.image > a')
        ?.getAttribute('href')
        ?.split('/')
        .pop();
      const lastestChapter = story
        .querySelector('.comic-item li a')
        ?.textContent?.split(' ')[1];
      const shortDescription = story.querySelector('.box_text')?.textContent;
      const isTrending = Boolean(story.querySelector('.icon-hot'));
      const details = Array.from(story.querySelectorAll('.message_main p')).map(
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
      return {
        ...objDetail,
        thumbnail,
        title,
        views,
        comments,
        likes,
        shortDescription,
        isTrending,
        link,
        lastestChapter: lastestChapter ? parseFloat(lastestChapter) : 0,
      };
    }
  );
  const totalPages = doc
    .querySelector('.pagination .hidden')
    ?.textContent?.split('/')[1]
    .trim();

  return { stories, totalPages: totalPages ? totalPages : 0 };
};
