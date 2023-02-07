import axios from 'axios';
import { FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { crawlBaseUrl, imageProxyServer } from '../../constants/env-variables';
import { useChapter } from '../../hooks/useChapter';
import { useChapters } from '../../hooks/useChapters';

interface Chapter {
  chapterId: number;
  name: string;
  url: string;
}

const ReadChapter: FunctionComponent = () => {
  const { name, chapter, id } = useParams();
  const { images, comicId, comicName } = useChapter(
    `${crawlBaseUrl}/truyen-tranh/${name}/${chapter}/${id}`
  );
  const comicChapters = useChapters(comicId);
  const chapterId = chapter?.split('-')[1];
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${comicName ? comicName + ' | ' : ''} Comics HQ`;
  }, [comicName]);

  useEffect(() => {
    setChapters(comicChapters);
  }, [comicChapters]);

  const handleOpenMenu = (e: any) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'DIV') return;
    setIsOpenMenu(!isOpenMenu);
  };

  const handleSearchChapter = (e: any) => {
    const filteredChapter = comicChapters.filter((chapter: Chapter) =>
      chapter.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setChapters(filteredChapter);
  };

  const currentChapterIdx = comicChapters.findIndex((chapter: Chapter) => {
    const id = chapter.name.split(':')[0].split(' ')[1];
    return id === chapterId;
  });

  const handleEpisode = (type: string) => {
    if (type === 'next' && currentChapterIdx - 1 < 0) return;
    if (type === 'prev' && currentChapterIdx + 1 === comicChapters.length)
      return;
    type === 'next'
      ? navigate(
          `/read/${comicChapters[currentChapterIdx - 1].url
            .split('/')
            .slice(2)
            .join('/')}`
        )
      : navigate(
          `/read/${comicChapters[currentChapterIdx + 1].url
            .split('/')
            .slice(2)
            .join('/')}`
        );
  };

  return (
    <>
      <h1 className='text-4xl font-bold text-center max-w-3xl mx-auto'>
        {comicName}
      </h1>
      <p className='text-center text-xl mt-0.5 font-semibold'>
        Chapter {chapterId}
      </p>
      <div className='flex items-center justify-between max-w-3xl mx-auto mb-5 mt-10'>
        <button
          className={`p-2 rounded duration-150 ${
            currentChapterIdx + 1 === comicChapters.length
              ? 'bg-gray-500 hover:bg-gray-500 cursor-default'
              : 'bg-teal-500 hover:bg-teal-600'
          }`}
          onClick={() => handleEpisode('prev')}
        >
          <AiOutlineDoubleLeft />
        </button>
        <button
          className='flex items-center gap-1 bg-rose-500 px-2 py-1 rounded relative'
          onClick={handleOpenMenu}
        >
          {comicChapters[currentChapterIdx]?.name}
          <HiOutlineChevronDown />
          <div
            className={` px-4 py-3 bg-gray-800 w-[384px] absolute top-10 rounded text-center right-1/2 translate-x-1/2 duration-150 ${
              isOpenMenu
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
          >
            <input
              type='text'
              placeholder='Nhập số chương, VD: 164'
              className='outline-none text-black px-2 py-1 border border-rose-500 rounded mb-2'
              onInput={handleSearchChapter}
            />
            <ul className='max-h-80 overflow-auto'>
              {chapters.map((chapter: Chapter) => (
                <Link to={`/read/${chapter.url.split('/').slice(2).join('/')}`}>
                  <li className='px-2 py-1 bg-gray-800 hover:bg-gray-900 duration-150'>
                    {chapter.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </button>
        <button
          className={`p-2 rounded duration-150 ${
            currentChapterIdx - 1 < 0
              ? 'bg-gray-500 hover:bg-gray-500 cursor-default'
              : 'bg-teal-500 hover:bg-teal-600'
          }`}
          onClick={() => handleEpisode('next')}
        >
          <AiOutlineDoubleRight />
        </button>
      </div>
      <div className='flex flex-col items-center'>
        {images?.map((image: string) => (
          <img
            src={`${imageProxyServer}?src=${image}`}
            alt={comicName}
            draggable={false}
          />
        ))}
      </div>
    </>
  );
};

export default ReadChapter;
