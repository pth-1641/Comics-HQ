import axios from 'axios';
import { useState, useEffect } from 'preact/hooks';
import {
  crawlBaseUrl,
  thirdPartyName,
  thirdPartyUrl,
} from '../constants/env-variables';

export const useGenres = () => {
  const [genres, setGenres] = useState({});

  useEffect(() => {
    (async () => {
      const headersList = {
        Accept: '*/*',
        'User-Agent': `${thirdPartyName} (${thirdPartyUrl})`,
      };
      const reqOptions = {
        url: crawlBaseUrl,
        method: 'GET',
        headers: headersList,
      };

      const response = await axios.request(reqOptions);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      const elements = doc.querySelectorAll(
        '#mainNav > div > div > div > div > ul > li:nth-child(5) > ul > li > div li'
      );

      const genres = Array.from(elements).map((el) => {
        const title = el.querySelector('a')?.innerText.replace(/\n/g, '');
        const desciption = el.querySelector('a')?.getAttribute('data-title');
        const link = el
          .querySelector('a')
          ?.getAttribute('href')
          ?.replace(crawlBaseUrl, '');
        return {
          title,
          desciption,
          link,
        };
      });
      setGenres(genres);
    })();
  }, []);

  return { genres };
};
