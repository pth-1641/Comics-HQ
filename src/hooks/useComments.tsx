import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { crawlBaseUrl } from '../constants/env-variables';

interface Input {
  id?: string;
  orderBy?: number;
  chapterId?: number;
  pageNumber?: number;
  token?: string;
}

export const useComments = async ({
  id,
  orderBy = 0,
  chapterId = -1,
  pageNumber = 1,
  token,
}: Input) => {
  if (!id && !token) return;

  let headersList = {
    Accept: '*/*',
  };

  const reqOptions = {
    url: `${crawlBaseUrl}/Comic/Services/CommentService.asmx/List?comicId=${id}&orderBy=${orderBy}&chapterId=${chapterId}&parentId=0&pageNumber=${pageNumber}&token=${token}`,
    method: 'GET',
    headers: headersList,
  };

  const { data } = await axios.request(reqOptions);
  const text = data.response;
  const parser = new DOMParser();
  const doc: Document = parser.parseFromString(text, 'text/html');
  console.log(
    `${crawlBaseUrl}/Comic/Services/CommentService.asmx/List?comicId=${id}&orderBy=${orderBy}&chapterId=${chapterId}&parentId=0&pageNumber=${pageNumber}&token=${token}`
  );
  const totalComments = data?.commentCount?.split(',').join('');
  const totalPages = data?.pager?.split('of ')[1].split(' <')[0];
  const comments = Array.from(doc.querySelectorAll('.clearfix')).map(
    (comment: Element) => {
      const author = comment.querySelector('.authorname')?.textContent;
      const avatar =
        'https:' + comment.querySelector('.avatar img')?.getAttribute('src');
      const content = comment.querySelector('.comment-content')?.textContent;
      const likes = comment
        .querySelector('.comment-footer .vote-up-count')
        ?.textContent?.replace(/\n/g, '');
      const dislikes = comment
        .querySelector('.comment-footer .vote-down-count')
        ?.textContent?.replace(/\n/g, '');
      const time = comment
        .querySelector('.comment-footer li abbr')
        ?.textContent?.replace(/\n/g, '')
        .trim();
      const imgContent = Array.from(
        comment.querySelectorAll('.fa-angle-left + div img')
      ).map((img: Element) => 'https:' + img.getAttribute('src'));
      const replies = Array.from(comment.querySelectorAll('.item')).map(
        (reply: Element) => {
          const avatar = reply.querySelector('img')?.getAttribute('src');
          const author = reply.querySelector('.authorname')?.textContent;
          const mentionUser = reply
            .querySelector('.mention-user')
            ?.textContent?.replace(/\n/g, '');
          const content = reply
            .querySelector('.comment-content')
            ?.textContent?.replace(/\n/g, '');
          const imgContent = Array.from(
            reply.querySelectorAll('.child .comment-content img')
          ).map((img) => 'https:' + img.getAttribute('src'));
          const likes = reply
            .querySelector('.vote-up')
            ?.textContent?.replace(/\n/g, '');
          const dislikes = reply
            .querySelector('.vote-down')
            ?.textContent?.replace(/\n/g, '');
          const time = reply
            .querySelector('.comment-footer li abbr')
            ?.textContent?.replace(/\n/g, '')
            .trim();

          return {
            avatar,
            author,
            mentionUser,
            content,
            likes: likes ? parseInt(likes) : 0,
            dislikes: dislikes ? parseInt(dislikes) : 0,
            time,
            imgContent,
          };
        }
      );
      return {
        author,
        avatar,
        content,
        likes: likes ? parseInt(likes) : 0,
        dislikes: dislikes ? parseInt(dislikes) : 0,
        replies,
        time,
        imgContent,
      };
    }
  );

  return {
    comments,
    totalComments: totalComments !== 'undefined' ? parseInt(totalComments) : 0,
    totalPages: totalPages !== 'undefined' ? parseInt(totalPages) : 0,
  };
};
