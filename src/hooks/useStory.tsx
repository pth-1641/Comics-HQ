import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { crawlBaseUrl } from '../constants/env-variables';

export const useStory = (url: string) => {
  const [story, setStory] = useState<any>();

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
        .split('<article id="item-detail">')[1]
        .split('<a class="hidden view-more" href="#">')[0];
      const parser = new DOMParser();
      const doc: Document = parser.parseFromString(text, 'text/html');
      const title = doc.querySelector('h1')?.textContent;
      const thumbnail =
        'https:' + doc.querySelector('img')?.getAttribute('src');
      const otherNames = doc
        .querySelector('.othername h2')
        ?.textContent?.split(/[,;]/g);
      const author = doc.querySelector('.author a')?.textContent;
      const status = doc.querySelector('.status p:last-child')?.textContent;
      const genres = Array.from(doc.querySelectorAll('.kind p a')).map((i) => {
        const link = i
          .getAttribute('href')
          ?.replace(`${crawlBaseUrl}/tim-truyen/`, '');
        const label = i.textContent;
        return {
          link,
          label,
        };
      });
      const totalViews = doc
        .querySelector('.kind + li p:last-child')
        ?.textContent?.split('.')
        .join('');
      const rating = doc
        .querySelector('span[itemprop="ratingValue"]')
        ?.textContent?.toString();
      const totalRating = doc
        .querySelector('span[itemprop="ratingCount"]')
        ?.textContent?.toString();
      const totalLikes = doc
        .querySelector('.follow b')
        ?.textContent?.split('.')
        .join('');
      const shortDescription =
        doc.querySelector('.detail-content p')?.textContent;
      const chapters = Array.from(doc.querySelectorAll('nav li')).map(
        (chapter) => {
          const label = chapter.querySelector('a')?.textContent;
          const chapterLink = chapter
            .querySelector('a')
            ?.getAttribute('href')
            ?.replace(`${crawlBaseUrl}/truyen-tranh/`, '');
          const updatedAt =
            chapter.querySelector('div:nth-child(2)')?.textContent;
          const views = chapter
            .querySelector('div:last-child')
            ?.textContent?.split('.')
            .join('');
          return {
            label,
            chapterLink,
            updatedAt,
            views: typeof views !== 'undefined' ? parseInt(views) : 0,
          };
        }
      );
      setStory({
        title,
        thumbnail,
        otherNames,
        author,
        status,
        genres,
        totalViews:
          typeof totalViews !== 'undefined' ? parseInt(totalViews) : 0,
        totalLikes:
          typeof totalLikes !== 'undefined' ? parseInt(totalLikes) : 0,
        totalRating:
          typeof totalRating !== 'undefined' ? parseInt(totalRating) : 0,
        rating: typeof rating !== 'undefined' ? parseFloat(rating) * 2 : 0,
        shortDescription,
        chapters,
      });
    })();
  }, []);

  return story;
};
