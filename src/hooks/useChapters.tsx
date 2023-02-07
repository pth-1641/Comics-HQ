import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { crawlBaseUrl, proxyServer } from '../constants/env-variables';

export const useChapters = (id: number) => {
  const [chapters, setChapters] = useState<any>([]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `${
            proxyServer + crawlBaseUrl
          }/Comic/Services/ComicService.asmx/ProcessChapterList?comicId=${id}`
        );
        setChapters(data.chapters);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  return chapters;
};
