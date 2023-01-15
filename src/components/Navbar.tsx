import { FunctionComponent } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { FiSearch } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/search?q=${searchValue}`);
    inputRef.current.blur();
  };

  return (
    <header
      className={`fixed z-50 top-0 right-0 left-0 py-3 duration-700 bg-black`}
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-10'>
          <NavLink to='/'>
            <h1 className='text-white text-2xl select-none font-semibold'>
              Comics <span className='px-2 bg-emerald-500 rounded-sm'>HQ</span>
            </h1>
          </NavLink>
          <ul className='group flex items-center gap-5 text-white'>
            <NavLink
              to='/'
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? 'underline decoration-2 underline-offset-8' : ''
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to='/genres'
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? 'underline decoration-2 underline-offset-8 ' : ''
              }
            >
              Thể loại
              {/* <ul className='absolute top-full bg-black grid grid-cols-2 gap-x-6 gap-y-3 px-4 py-2 duration-200'>
                {genres?.map((genre) => (
                  <li
                    className='w-max hover:text-emerald-300 duration-150'
                    key={genre}
                  >
                    {genre}
                  </li>
                ))}
              </ul> */}
            </NavLink>
          </ul>
        </div>
        <form
          className='flex rounded-sm overflow-hidden'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Tìm truyện, tác giả...'
            className='px-3 py-1 outline-none'
            value={searchValue}
            onInput={(e: any) => setSearchValue(e.target.value)}
            ref={inputRef}
          />
          <button type='submit' className='bg-emerald-500 text-white px-3'>
            <FiSearch />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
