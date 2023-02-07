import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { crawlBaseUrl } from '../constants/env-variables';

export const useGenres = () => {
  const [genres, setGenres] = useState<any>();
  const [sort, setSort] = useState<any>();

  useEffect(() => {
    (async () => {
      const headersList = {
        Accept: '*/*',
      };
      const reqOptions = {
        url: `${crawlBaseUrl}/tim-truyen`,
        method: 'GET',
        headers: headersList,
      };

      const { data } = await axios.request(reqOptions);
      const text = data.split('</header>')[1].split('<main class="main">')[0];
      const parser = new DOMParser();
      const doc: Document = parser.parseFromString(text, 'text/html');
      const elements = doc.querySelectorAll('.megamenu .col-sm-3 li');
      const genres = Array.from(elements).map((el) => {
        const title = el.querySelector('a')?.innerText.replace(/\n/g, '');
        const description = el.querySelector('a')?.getAttribute('data-title');
        const link = el
          .querySelector('a')
          ?.getAttribute('href')
          ?.replace(`${crawlBaseUrl}/tim-truyen`, '');
        return {
          title,
          description,
          link,
        };
      });
      setGenres(genres);
      const sortText = data
        .split('<div class="hidden-xs">')[1]
        .split('</div>')[0];
      const sortDoc: Document = parser.parseFromString(sortText, 'text/html');
      const sortElements = sortDoc.querySelectorAll('a');
      const sort = Array.from(sortElements).map((el) => {
        const title = el.textContent;
        const code = el.getAttribute('href')?.split('=').pop();
        return { title, code: isNaN(Number(code)) ? 0 : Number(code) };
      });
      setSort(sort);
    })();
  }, []);

  return { genres, sort };
};
