import { FunctionComponent } from 'preact';
import {
  HiChevronDoubleRight,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronLeft,
} from 'react-icons/hi';

interface ComponentProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: FunctionComponent<ComponentProps> = ({
  totalPages,
  currentPage,
}) => {
  const pages: (number | string)[] = [
    currentPage > 1 ? currentPage - 1 : currentPage,
    currentPage > 1 ? currentPage : currentPage + 1,
    currentPage > 1 ? currentPage + 1 : currentPage + 2,
    '...',
    totalPages - 2,
    totalPages - 1,
    totalPages,
  ];

  return (
    <>
      <ul className='w-max mx-auto mt-8 flex gap-2 items-stretch'>
        <li className='text-white px-2 py-1 flex items-center justify-center rounded hover duration-100 text-lg cursor-pointer'>
          <HiChevronDoubleLeft />
        </li>
        <li className='text-white px-2 py-1 flex items-center justify-center rounded hover duration-100 text-lg cursor-pointer'>
          <HiChevronLeft />
        </li>
        {pages.map((page) => (
          <li
            className={`text-white min-w-[2rem] py-1 flex items-center justify-center rounded cursor-pointer ${
              page === currentPage ? 'bg-blue-500' : ''
            }`}
          >
            {page}
          </li>
        ))}
        <li className='text-white px-2 py-1 flex items-center justify-center rounded hover duration-100 text-lg cursor-pointer'>
          <HiChevronRight />
        </li>
        <li className='text-white px-2 py-1 flex items-center justify-center rounded hover duration-100 text-lg cursor-pointer'>
          <HiChevronDoubleRight />
        </li>
      </ul>
    </>
  );
};

export default Pagination;
