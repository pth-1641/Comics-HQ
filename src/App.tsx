import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages';

export const App: FunctionComponent = () => {
  const { key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  return (
    <>
      <Navbar />
      <div className='h-14'></div>
      <div className='bg-neutral-900 text-white px-20 pt-10 pb-12'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </>
  );
};
