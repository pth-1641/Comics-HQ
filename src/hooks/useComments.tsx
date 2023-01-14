import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';

export const useComments = (url: string) => {
  const [comments, setComments] = useState<any>();

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
        .split(
          '<ul class="nav nav-tabs main-tab lazy-module" data-type="facebook">'
        )[1]
        .split('<div id="fb_comments" class="tab-pane fade">')[0];
      const parser = new DOMParser();
      const doc: Document = parser.parseFromString(text, 'text/html');
      console.log(doc);
      const totalComments = doc
        .querySelector('.comment-count')
        ?.textContent?.split('.')
        .join(',');
      const totalPages = doc
        .querySelector('.hidden')
        ?.textContent?.split(' / ')[1];
      const comments = Array.from(
        doc.querySelectorAll('.comment-list .item')
      ).map((comment) => {
        const author = comment.querySelector('.authorname')?.textContent;
        const avatar =
          'https:' +
          comment.querySelector('.avatar img')?.getAttribute('data-original');
        const content = comment.querySelector('.comment-content')?.textContent;
        const likes = comment
          .querySelector('.comment-footer .vote-up-count')
          ?.textContent?.replace(/\n/g, '');
        const dislikes = comment
          .querySelector('.comment-footer .vote-down-count')
          ?.textContent?.replace(/\n/g, '');
        return {
          author,
          avatar,
          content,
          likes: typeof likes !== 'undefined' ? parseInt(likes) : 0,
          dislikes: typeof dislikes !== 'undefined' ? parseInt(dislikes) : 0,
        };
      });
      setComments({
        comments,
        totalComments,
        totalPages:
          typeof totalPages !== 'undefined' ? parseInt(totalPages) : 0,
      });
    })();
  }, []);

  return comments;
};
