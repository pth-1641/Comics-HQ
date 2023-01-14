import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './stores';
import DetailModal from './components/DetailModal';
import Navbar from './components/Navbar';
import Home from './pages';
import Story from './pages/stories/[id]';
import ReadChapter from './pages/read/[id]';

export const App: FunctionComponent = () => {
  const { key } = useLocation();
  const details = useStore((state: any) => state.details);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  return (
    <>
      <Navbar />
      <DetailModal story={details} />
      <div className='h-14'></div>
      <div className='bg-neutral-900 text-white px-20 pt-10 pb-12'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stories/:id' element={<Story />} />
          <Route path='/read/:name/:chapter/:slug' element={<ReadChapter />} />
        </Routes>
      </div>
    </>
  );
};
