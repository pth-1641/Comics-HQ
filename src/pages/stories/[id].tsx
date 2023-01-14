import { FunctionComponent } from 'preact';
import { Link, useParams } from 'react-router-dom';
import { useStory } from '../../hooks/useStory';
import { FaUserTie } from 'react-icons/fa';
import { crawlBaseUrl } from '../../constants/env-variables';
import { StoryDetails } from '../../types';
import { AiFillInfoCircle } from 'react-icons/ai';
import {
  BsEyeFill,
  BsFillHeartFill,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { first, last } from 'lodash';
import { useComments } from '../../hooks/useComments';

const Story: FunctionComponent = () => {
  const { id } = useParams();
  const story: StoryDetails = useStory(`${crawlBaseUrl}/truyen-tranh/${id}`);
  const comments = useComments(`${crawlBaseUrl}/truyen-tranh/${id}`);
  console.log(comments);

  const score = typeof story?.rating !== 'undefined' ? story.rating : 0;
  const stars: any[] = [];

  for (let i = 0; i < 10; i++) {
    if (i < score - 0.5) stars.push(<BsStarFill />);
    if (i === score - 0.5) stars.push(<BsStarHalf />);
    if (i > score - 0.5) stars.push(<BsStar />);
  }

  return (
    <>
      <div className='flex gap-4 text-white'>
        <img
          src={story?.thumbnail}
          alt={story?.title}
          className='rounded object-cover'
          draggable={false}
        />
        <div>
          <h2 className='text-3xl font-semibold'>{story?.title}</h2>
          <div className='flex text-sm gap-2 text-emerald-500'>
            {story?.otherNames?.map((name) => (
              <span key={name}>{`#${name}`}</span>
            ))}
          </div>
          <div className='flex gap-1 flex-wrap my-2'>
            {story?.genres?.map((genre, key) => (
              <span
                key={key}
                className='bg-fuchsia-500 px-2 py-0.5 rounded hover:bg-fuchsia-600 cursor-pointer'
              >
                {genre.label}
              </span>
            ))}
          </div>
          <div className='text-yellow-500 flex items-center gap-1 my-2'>
            {stars.map((s, key) => (
              <span key={key}>{s}</span>
            ))}
          </div>
          {story?.author && (
            <p className='flex items-center gap-2 mb-1'>
              <strong className='text-emerald-500 flex items-center gap-1'>
                <span className='text-lg text-pink-400'>
                  <FaUserTie />
                </span>
                Tác giả:
              </strong>
              {story?.author}
            </p>
          )}
          <p className='flex items-center gap-2 mb-1'>
            <strong className='text-emerald-500 flex items-center gap-1'>
              <span className='text-lg text-blue-400'>
                <AiFillInfoCircle />
              </span>
              Trạng thái:
            </strong>
            {story?.status === 'Đang tiến hành'
              ? 'Chưa hoàn thành'
              : 'Đã hoàn thành'}
          </p>
          <p className='flex items-center gap-2 mb-1'>
            <strong className='text-emerald-500 flex items-center gap-1'>
              <span className='text-lg text-lime-500'>
                <BsEyeFill />
              </span>
              Lượt xem:
            </strong>
            {story?.totalViews?.toLocaleString() === 'NaN'
              ? 'N/A'
              : story?.totalViews?.toLocaleString()}
          </p>
          <p className='flex items-center gap-2 mb-1'>
            <strong className='text-emerald-500 flex items-center gap-1'>
              <span className='text-lg text-rose-500'>
                <BsFillHeartFill />
              </span>
              Lượt yêu thích:
            </strong>
            {story?.totalLikes?.toLocaleString()}
          </p>
          <p className='flex items-center gap-2 mb-1'>
            <strong className='text-emerald-500 flex items-center gap-1'>
              <span className='text-lg text-yellow-500'>
                <FaStar />
              </span>
              Lượt đánh giá:
            </strong>
            {story?.totalRating?.toLocaleString()}
          </p>
          <p className='mt-2'>
            {story?.shortDescription?.replace(/NetTruyen/g, 'ComicsHQ')}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between mt-10 mb-3'>
        <h2 className='font-semibold text-2xl'>
          Tổng số chương: {story?.chapters?.length}
        </h2>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-1 rounded bg-teal-500 hover:bg-teal-600 duration-150'>
            <Link to={`/read/${last(story?.chapters)?.chapterLink}`}>
              Đọc chương đầu
            </Link>
          </button>
          <button className='px-3 py-1 rounded bg-teal-500 hover:bg-teal-600 duration-150'>
            <Link to={`/read/${first(story?.chapters)?.chapterLink}`}>
              Đọc chương cuối
            </Link>
          </button>
        </div>
      </div>
      <div className='flex gap-10'>
        <div className='w-full'>
          <div className='flex text-center uppercase text-xs font-bold border border-b-0 border-gray-700'>
            <p className='w-3/5 bg-gray-700 py-3'>Tên chương</p>
            <p className='w-1/5 bg-gray-700 py-3'>Ngày cập nhật</p>
            <p className='w-1/5 bg-gray-700 py-3'>Tổng số lượt xem</p>
          </div>
          <div className='max-h-screen overflow-auto'>
            {story?.chapters?.map((chapter) => (
              <Link
                key={chapter.chapterLink}
                to={`/read/${chapter.chapterLink}`}
              >
                <div className='flex text-center hover:bg-gray-600 duration-150'>
                  <p className='w-3/5 py-3 border-b border-l border-gray-700 pl-2'>
                    {chapter.label}
                  </p>
                  <p className='w-1/5 py-3 border-b border-gray-700 pl-4'>
                    {chapter.updatedAt.includes('/')
                      ? chapter.updatedAt.slice(0, -3) +
                        '/20' +
                        chapter.updatedAt.slice(-2)
                      : chapter.updatedAt}
                  </p>
                  <p className='w-1/5 py-3 border-b border-r border-gray-700 pl-4'>
                    {chapter.views.toLocaleString() === 'NaN'
                      ? 'N/A'
                      : chapter.views.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <h2 className='font-semibold text-2xl mt-6 mb-2'>
        Tổng số bình luận: {comments?.comments.length}
      </h2>
      {/* {comments?.comments.map((comment) => (
        <div className='flex gap-2'>
          <img
            src={comment.avatar}
            alt={comment.author}
            draggable={false}
            className='rounded-full aspect-square h-12 w-12 object-cover'
          />
          <div>
            <h6>{comment.author}</h6>
            <p>{comment.content}</p>
          </div>
        </div>
      ))} */}
    </>
  );
};

export default Story;
