import { FunctionComponent } from 'preact';
import { BsChatFill, BsFillEyeFill, BsFillHeartFill } from 'react-icons/bs';
import { Story } from '../types';
import { useStore } from '../stores';
import { Link } from 'react-router-dom';

const ListStories: FunctionComponent<{
  title: string;
  stories: Story[];
  browseLink?: string;
}> = ({ stories, title, browseLink }) => {
  const getDetails = useStore((state: any) => state.getDetails);

  return (
    <>
      <h2 className='text-3xl font-bold mb-4 flex justify-between items-end'>
        {title}
        {browseLink && (
          <Link to={browseLink}>
            <span className='text text-emerald-500 text-base font-normal hover:underline'>
              Xem thêm
            </span>
          </Link>
        )}
      </h2>
      <div className='flex justify-center gap-y-10 gap-x-4 flex-wrap'>
        {stories.map((story) => (
          <div className='flex-1 max-w-[190px]' key={story.link}>
            <div className='rounded-md overflow-hidden relative w-full h-64 aspect-[0.65]'>
              <img
                className='w-full h-full object-cover'
                src={story.thumbnail}
                alt={story.title}
                draggable={false}
              />
              {story.isTrending && (
                <span className='absolute text-white bg-rose-500 font-semibold px-2 py-0.5 rounded text-xs top-2 left-2 '>
                  HOT
                </span>
              )}
              <span className='absolute right-0 bottom-3 bg-sky-500 text-white px-2 rounded-l text-sm'>
                {story.lastestChapter} /{' '}
                {story.status === 'Đang tiến hành'
                  ? '??'
                  : story.lastestChapter}
              </span>
            </div>
            <h3 className='line-clamp-1 font-semibold leading-5 mt-1 text-emerald-500'>
              <abbr title={story.title} className='no-underline'>
                {story.title}
              </abbr>
            </h3>
            <div className='flex items-center justify-evenly gap-3 mt-1 text-xs'>
              <span className='flex items-center gap-2'>
                <span className='text-sm text-cyan-500'>
                  <BsFillEyeFill />
                </span>
                {story.views}
              </span>
              <span className='flex items-center gap-1'>
                <span className='text-rose-500 text-sm'>
                  <BsFillHeartFill />
                </span>
                {story.likes}
              </span>
              <span className='flex items-center gap-1'>
                <span className='text-green-500 text-sm'>
                  <BsChatFill />
                </span>
                {story.comments}
              </span>
            </div>
            <div className='my-2 flex gap-2 items-center'>
              <button
                className='rounded bg-cyan-500 hover:bg-cyan-600 duration-150 text-white w-full py-1'
                onClick={() => getDetails(story)}
              >
                Chi tiết
              </button>
              <Link
                key={story.link}
                to={`/stories/${story.link}`}
                className='w-full'
              >
                <button className='rounded bg-purple-500 hover:bg-purple-600 duration-150 text-white w-full py-1'>
                  Đọc ngay
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListStories;
