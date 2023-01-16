import { FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { HiThumbDown, HiThumbUp } from 'react-icons/hi';
import { useComments } from '../hooks/useComments';
import { useStore } from '../stores';
import { Comment } from '../types';

interface Comments {
  comments: Comment[];
  totalComments: number;
  totalPages: number;
}

const Comments: FunctionComponent = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [comments, setComments] = useState<Comments | undefined>();
  const comic = useStore((state: any) => state.comic);
  const { id, token } = comic;

  useEffect(() => {
    getComments(pageNumber);
  }, [token, pageNumber]);

  const formatDate = (time: string) => {
    return time.slice(-8, -2) + '20' + time.slice(-2);
  };

  const getComments = async (pageNumber: number) => {
    if (pageNumber < 1) return;
    const comments: any = await useComments({ id, token, pageNumber });
    setPageNumber(pageNumber);
    setComments(comments);
  };

  return (
    <>
      <h2 className='font-semibold text-2xl mb-6'>
        Tổng số bình luận: {comments?.totalComments?.toLocaleString()}
      </h2>
      <div className='flex flex-col gap-5'>
        {comments?.comments.map((comment: Comment) => (
          <div className='flex gap-3'>
            <img
              src={comment.avatar}
              alt={comment.author}
              draggable={false}
              className='rounded-full h-10 w-10 object-cover'
            />
            <div className='flex-1 p-3 pt-1 rounded bg-zinc-700'>
              <h6 className='font-bold text-emerald-500 flex items-center gap-2'>
                {comment.author}
                <span className='text-sm font-medium text-stone-300'>
                  {comment.time.includes('/')
                    ? formatDate(comment.time)
                    : comment.time}
                </span>
              </h6>
              <p className='text-sm mb-0.5 break-all'>{comment.content}</p>
              <div className='flex gap-1 flex-wrap'>
                {comment.imgContent.map((img: string, key: number) => (
                  <img key={key} src={img} draggable={false} />
                ))}
              </div>
              <div className='flex items-center gap-4 mt-2'>
                <span className='flex items-center gap-0.5'>
                  <HiThumbUp />
                  <span className='text-sm leading-4'>{comment.likes}</span>
                </span>
                <span className='flex items-center gap-0.5'>
                  <HiThumbDown />
                  <span className='text-sm leading-4'>{comment.dislikes}</span>
                </span>
              </div>
              {comment.replies.length ? (
                <div className='w-11/12 ml-auto'>
                  <h4 className='font-semibold my-1 text-teal-500'>
                    Trả lời: {comment.replies.length}
                  </h4>
                  <div className='flex flex-col gap-5'>
                    {comment.replies.map((reply, key) => (
                      <div
                        className='flex gap-3 rounded p-2 bg-zinc-800'
                        key={key}
                      >
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          draggable={false}
                          className='rounded-full h-10 w-10 object-cover'
                        />
                        <div>
                          <h6 className='font-semibold text-emerald-500 flex items-center gap-2'>
                            {reply.author}
                            <span className='text-sm font-medium text-stone-300'>
                              {comment.time.includes('/')
                                ? formatDate(comment.time)
                                : comment.time}
                            </span>
                          </h6>
                          <p className='text-sm mb-0.5 break-all'>
                            {reply.mentionUser && (
                              <span className='text-fuchsia-500 font-semibold'>
                                {`@${reply.mentionUser}`}
                              </span>
                            )}
                            {reply.content.replace(reply.mentionUser, '')}
                          </p>
                          <div className='flex gap-1 flex-wrap'>
                            {reply.imgContent.map(
                              (img: string, key: number) => (
                                <img key={key} src={img} draggable={false} />
                              )
                            )}
                          </div>
                          <div className='flex items-center gap-4 mt-2'>
                            <span className='flex items-center gap-0.5'>
                              <HiThumbUp />
                              <span className='text-sm leading-4'>
                                {reply.likes}
                              </span>
                            </span>
                            <span className='flex items-center gap-0.5'>
                              <HiThumbDown />
                              <span className='text-sm leading-4'>
                                {reply.dislikes}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
