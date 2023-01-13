import { useLastUpdatedStories } from '../hooks/useLastUpdatedStories';
import { BsFillEyeFill, BsFillHeartFill, BsChatFill } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { NewlyUpdatedStories } from '../types';

function Home() {
  const stories = useLastUpdatedStories();

  console.log(stories);

  return (
    <>
      <h2 className='text-3xl font-bold mb-4 flex justify-between items-end'>
        Truyện mới cập nhật
        <span className='text text-emerald-500 underline text-base font-normal'>
          Xem thêm
        </span>
      </h2>
      <div className='flex justify-center gap-y-10 gap-x-4 flex-wrap'>
        {stories.map((story: NewlyUpdatedStories) => (
          <div className='flex-1'>
            <div className='rounded-md overflow-hidden relative w-full h-64 aspect-[0.65]'>
              <img
                className='h-full w-full object-cover'
                src={story.thumbnail}
                alt={story.title}
                draggable={false}
              />
              {story.isTrending && (
                <span className='absolute text-white bg-rose-500 font-semibold px-2 py-0.5 rounded text-xs top-2 left-2'>
                  HOT
                </span>
              )}
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
              <button className='rounded bg-cyan-500 hover:bg-cyan-600 duration-150 text-white w-full py-1'>
                Chi tiết
              </button>
              <button className='rounded bg-purple-500 hover:bg-purple-600 duration-150 text-white w-full py-1'>
                Đọc ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
