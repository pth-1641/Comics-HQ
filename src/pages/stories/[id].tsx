import { first, last } from 'lodash';
import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { AiFillInfoCircle } from 'react-icons/ai';
import {
  BsEyeFill,
  BsFillHeartFill,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from 'react-icons/bs';
import { FaStar, FaUserTie } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Comments from '../../components/Comments';
import { crawlBaseUrl } from '../../constants/env-variables';
import { useStory } from '../../hooks/useStory';
import { useStore } from '../../stores';
import { StoryDetails } from '../../types';

const Story: FunctionComponent = () => {
  const { id } = useParams();

  const {
    story,
    chapterToken,
    comicId,
  }: { story: StoryDetails; chapterToken?: string; comicId: number } = useStory(
    `${crawlBaseUrl}/truyen-tranh/${id}`
  );
  const getComic = useStore((state: any) => state.getComic);

  useEffect(() => {
    getComic({ id: comicId, token: chapterToken });
  }, [chapterToken]);

  const score =
    typeof story?.rating !== 'undefined' ? Math.round(story.rating * 2) / 2 : 0;
  const stars: any[] = [];

  for (let i = 0; i < 10; i++) {
    if (i < score - 0.5) stars.push(<BsStarFill />);
    if (i === score - 0.5) stars.push(<BsStarHalf />);
    if (i > score - 0.5) stars.push(<BsStar />);
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex gap-4 text-white'>
        <img
          src={story?.thumbnail}
          alt={story?.title}
          className='rounded object-cover aspect-[0.65] h-96'
          draggable={false}
        />
        <div className='flex-1'>
          <h2 className='text-3xl font-semibold'>{story?.title}</h2>
          <div className='flex text-sm gap-2 text-emerald-500'>
            {story?.otherNames?.map((name) => (
              <span key={name}>{`#${name}`}</span>
            ))}
          </div>
          <div className='flex gap-1 flex-wrap my-2'>
            {story?.genres?.map((genre, key: number) => (
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
                T??c gi???:
              </strong>
              {story?.author}
            </p>
          )}
          <p className='flex items-center gap-2 mb-1'>
            <strong className='text-emerald-500 flex items-center gap-1'>
              <span className='text-lg text-blue-400'>
                <AiFillInfoCircle />
              </span>
              Tr???ng th??i:
            </strong>
            {story?.status === '??ang ti???n h??nh'
              ? 'Ch??a ho??n th??nh'
              : '???? ho??n th??nh'}
          </p>
          <p className='flex items-center gap-2 mb-1'>
            <strong className='text-emerald-500 flex items-center gap-1'>
              <span className='text-lg text-lime-500'>
                <BsEyeFill />
              </span>
              L?????t xem:
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
              L?????t y??u th??ch:
            </strong>
            {story?.totalLikes?.toLocaleString()}
          </p>
          <p className='flex items-center gap-2 mb-1'>
            <strong className='text-emerald-500 flex items-center gap-1'>
              <span className='text-lg text-yellow-500'>
                <FaStar />
              </span>
              L?????t ????nh gi??:
            </strong>
            {story?.totalRating?.toLocaleString()}
          </p>
          <p className='mt-2'>
            {story?.shortDescription?.replace(/NetTruyen/g, 'Comics HQ')}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between mt-10 mb-3'>
        <h2 className='font-semibold text-2xl'>
          T???ng s??? ch????ng: {story?.chapters?.length}
        </h2>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-1 rounded bg-teal-500 hover:bg-teal-600 duration-150'>
            <Link to={`/read/${last(story?.chapters)?.chapterLink}`}>
              ?????c ch????ng ?????u
            </Link>
          </button>
          <button className='px-3 py-1 rounded bg-teal-500 hover:bg-teal-600 duration-150'>
            <Link to={`/read/${first(story?.chapters)?.chapterLink}`}>
              ?????c ch????ng cu???i
            </Link>
          </button>
        </div>
      </div>
      <div className='flex gap-10'>
        <div className='w-full'>
          <div className='flex text-center uppercase text-xs font-bold border border-b-0 border-gray-700'>
            <p className='w-3/5 bg-gray-700 py-3'>T??n ch????ng</p>
            <p className='w-1/5 bg-gray-700 py-3'>Ng??y c???p nh???t</p>
            <p className='w-1/5 bg-gray-700 py-3'>T???ng s??? l?????t xem</p>
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
      <div className='py-0.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-10 mt-20'></div>
      <Comments />
    </div>
  );
};

export default Story;
