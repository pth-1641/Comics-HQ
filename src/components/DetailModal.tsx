import { FunctionComponent } from 'preact';
import { useStore } from '../stores';
import { BsFillHeartFill, BsEyeFill, BsFillChatFill } from 'react-icons/bs';
import { MdUpdate } from 'react-icons/md';
import { AiFillInfoCircle } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa';
import { useEffect, useState } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';

const DetailModal: FunctionComponent<any> = ({ story }) => {
  const resetDetails = useStore((state: any) => state.resetDetails);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (story) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [story]);

  const handleCloseModal = (e: Event) => {
    if (e.target === e.currentTarget) {
      resetDetails();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-[99] text-white duration-200'
      style={{ opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none' }}
      onClick={handleCloseModal}
    >
      {story ? (
        <div className='p-4 bg-gray-800 rounded-md max-w-3xl w-11/12'>
          <div className='flex gap-4 flex-col sm:flex-row items-center'>
            <div className='relative w-1/3 h-max'>
              <img
                src={story.thumbnail}
                alt={story.title}
                className='w-full rounded aspect-[0.7] object-cover'
                draggable={false}
              />
              {story.isTrending && (
                <span className='absolute top-2 left-2 bg-rose-500 font-semibold text-xs px-2 py-0.5 rounded'>
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
            <div className='w-full sm:w-2/3'>
              <h3 className='text-3xl font-semibold mb-2'>{story.title}</h3>
              <div className='flex items-center gap-1 flex-wrap'>
                {story.genres?.map((genre: string, key: number) => (
                  <span
                    key={key}
                    className='px-2 py-0.5 rounded bg-fuchsia-600 text-sm'
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className='flex items-center flex-wrap gap-x-5 gap-y-1 mt-2'>
                <p className='flex items-center gap-1'>
                  <span className='text-rose-500'>
                    <BsFillHeartFill />
                  </span>
                  {story.likes}
                </p>
                <p className='flex items-center gap-1'>
                  <span className='text-cyan-500'>
                    <BsEyeFill />
                  </span>
                  {story.views}
                </p>
                <p className='flex items-center gap-1'>
                  <span className='text-green-500'>
                    <BsFillChatFill />
                  </span>
                  {story.comments}
                </p>
                <p className='flex items-center gap-1'>
                  <span className='text-amber-400'>
                    <MdUpdate />
                  </span>
                  {story.updatedAt}
                </p>
                {story.author && (
                  <p className='flex items-center gap-1'>
                    <span className='text-pink-400'>
                      <FaUserTie />
                    </span>
                    {story.author}
                  </p>
                )}
                <p className='flex items-center gap-1'>
                  <span className='text-blue-400'>
                    <AiFillInfoCircle />
                  </span>
                  {story.status === 'Đang tiến hành'
                    ? 'Chưa hoàn thành'
                    : 'Đã hoàn thành'}
                </p>
              </div>
              {story.otherNames && (
                <div className='flex items-center gap-x-3 mt-1 mb-2 flex-wrap'>
                  {story.otherNames?.map((name: string) => (
                    <span className='text-emerald-500'>{`#${name}`}</span>
                  ))}
                </div>
              )}
              {story.shortDescription ? (
                <p className='border p-1 px-2 mt-1 text-sm'>
                  {story.shortDescription.length > 800
                    ? `${story.shortDescription.slice(0, 800)}...`
                    : story.shortDescription}
                </p>
              ) : (
                <p className='border p-1 px-2 mt-1 text-sm'>
                  Truyện tranh {story.title} được cập nhật nhanh và đầy đủ nhất
                  tại ComicsHQ. Bạn đọc đừng quên để lại bình luận và chia sẻ,
                  ủng hộ ComicsHQ ra các chương mới nhất của truyện{' '}
                  {story.title}.
                </p>
              )}
            </div>
          </div>
          <button
            className='rounded px-6 py-1 mx-auto mt-5 block border border-emerald-500 hover:bg-emerald-500 duration-200'
            onClick={() => {
              navigate(`/stories/${story.link}`);
              resetDetails();
            }}
          >
            Đọc ngay
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DetailModal;
