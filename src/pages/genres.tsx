import { FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGenres } from '../hooks/useGenres';
import { Genre, Sort } from '../types';

const status = [
  {
    title: 'Tất cả',
    code: 0,
  },
  {
    title: 'Chưa hoàn thành',
    code: 1,
  },
  {
    title: 'Hoàn thành',
    code: 2,
  },
];

const Genres: FunctionComponent = () => {
  const [isOpenGenres, setIsOpenGenres] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [selectedGenre, setSelectecedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [queryGenres, setQueryGenres] = useState('');
  const [listGenre, setListGenre] = useState<any>([]);

  const { genres, sort }: { genres: Genre[]; sort: Sort[] } = useGenres();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentGenre: string =
      genres?.find((g) => g.link.includes(String(searchParams.get('type'))))
        ?.title || '';
    setSelectecedGenre(currentGenre);
    setListGenre(genres);
  }, [genres]);

  useEffect(() => {
    const currentSort: string =
      sort?.find((s) => s.code === Number(searchParams.get('sort')))?.title ||
      '';
    setSelectedSort(currentSort);
  }, [sort]);

  useEffect(() => {
    const currentStatus: string =
      status.find((s) => s.code === Number(searchParams.get('status')))
        ?.title || '';
    setSelectedStatus(currentStatus);
  }, []);

  const toggleOpenMenu = (e: any, menuType: string) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'DIV') return;
    setIsOpenGenres(menuType === 'genres' ? !isOpenGenres : false);
    setIsOpenSort(menuType === 'sort' ? !isOpenSort : false);
    setIsOpenStatus(menuType === 'status' ? !isOpenStatus : false);
  };

  const handleSelectedMenu = (
    type: string,
    title: string,
    path: string | number
  ) => {
    const currentPath = window.location.search;
    if (type === 'genres') {
      setSelectecedGenre(title);
      navigate(
        currentPath.replace(
          String(searchParams.get('type')),
          `${path || 'tat-ca'}`
        )
      );
    }
    if (type === 'sort') {
      setSelectedSort(title);
      navigate(
        currentPath.replace(String(searchParams.get('sort')), `${path}`)
      );
    }
    if (type === 'status') {
      setSelectedStatus(title);
      navigate(currentPath.replace(/status=\w/, `status=${path}`));
    }
  };

  const handleQueryGenres = (e: any) => {
    const queryStr: string = e.target.value;
    const filteredGenres: Genre[] = genres.filter((genre) =>
      genre.title.toLowerCase().includes(queryStr.toLowerCase())
    );
    setListGenre(filteredGenres);
  };

  return (
    <>
      <div className='flex items-center justify-start gap-10'>
        {/* Genres */}
        <div className='flex items-center gap-4'>
          Thể loại
          <button
            className='flex items-center gap-1 bg-rose-500 px-2 py-0.5 rounded relative w-40 justify-center'
            onClick={(e) => toggleOpenMenu(e, 'genres')}
          >
            {selectedGenre}
            <HiOutlineChevronDown />
            <div
              className={` p-3 bg-gray-800 w-max absolute top-10 rounded text-center right-1/2 translate-x-1/2 duration-150 ${
                isOpenGenres
                  ? 'pointer-events-auto opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              <input
                type='text'
                placeholder='Thể loại'
                className='outline-none text-black px-2 py-0.5 border border-rose-500 rounded mb-2'
                onInput={handleQueryGenres}
              />
              <ul className='max-h-60 overflow-auto'>
                {listGenre?.map((genre: Genre) => (
                  <li
                    key={genre.link}
                    className='px-2 py-1 bg-gray-800 hover:bg-gray-900 duration-150 rounded-sm'
                    onClick={() =>
                      handleSelectedMenu(
                        'genres',
                        genre.title,
                        genre.link.slice(1)
                      )
                    }
                  >
                    {genre.title}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        </div>
        {/* Sort */}
        <div className='flex items-center gap-4'>
          Sắp xếp
          <button
            className='flex items-center gap-1 bg-rose-500 px-2 py-0.5 rounded relative w-40 justify-center'
            onClick={(e) => toggleOpenMenu(e, 'sort')}
          >
            {selectedSort}
            <HiOutlineChevronDown />
            <div
              className={` p-3 bg-gray-800 w-max absolute top-10 rounded text-center right-1/2 translate-x-1/2 duration-150 ${
                isOpenSort
                  ? 'pointer-events-auto opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              <ul className='max-h-60 overflow-auto'>
                {sort?.map((s) => (
                  <li
                    key={s.code}
                    className='px-8 py-1 bg-gray-800 hover:bg-gray-900 duration-150 rounded-sm'
                    onClick={() => handleSelectedMenu('sort', s.title, s.code)}
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        </div>
        {/* Status */}
        <div className='flex items-center gap-4'>
          Trạng thái
          <button
            className='flex items-center gap-1 bg-rose-500 px-2 py-0.5 rounded relative w-44 justify-center'
            onClick={(e) => toggleOpenMenu(e, 'status')}
          >
            {selectedStatus}
            <HiOutlineChevronDown />
            <div
              className={` p-3 bg-gray-800 w-max absolute top-10 rounded text-center right-1/2 translate-x-1/2 duration-150 ${
                isOpenStatus
                  ? 'pointer-events-auto opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              <ul className='max-h-60 overflow-auto'>
                {status?.map((s) => (
                  <li
                    key={s.code}
                    className='px-6 py-1 bg-gray-800 hover:bg-gray-900 duration-150 rounded-sm'
                    onClick={() =>
                      handleSelectedMenu('status', s.title, s.code)
                    }
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        </div>
      </div>
      <p className='mt-3 text-sm text-emerald-400'>
        {genres?.find((genre) => genre.link === '/' + searchParams.get('type'))
          ?.description || 'Tất cả thể loại truyện tranh'}
      </p>
    </>
  );
};

export default Genres;
