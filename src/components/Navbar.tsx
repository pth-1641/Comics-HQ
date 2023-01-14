import { FiSearch } from 'react-icons/fi';
import { FunctionComponent } from 'preact';
import { Link } from 'react-router-dom';

const Navbar: FunctionComponent = () => {
  return (
    <header
      className={`fixed z-50 top-0 right-0 left-0 py-3 duration-700 bg-black`}
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-10'>
          <Link to='/'>
            <h1 className='text-white text-2xl select-none font-semibold'>
              Comics <span className='px-2 bg-emerald-500 rounded-sm'>HQ</span>
            </h1>
          </Link>
          <ul className='group flex items-center gap-8 text-white'>
            <li>Home</li>
            <li className=''>
              Genres
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
            </li>
          </ul>
        </div>
        <form className='flex rounded-sm overflow-hidden'>
          <input
            type='text'
            placeholder='Search...'
            className='px-3 py-1 outline-none'
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
