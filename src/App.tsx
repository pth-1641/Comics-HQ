import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './stores';
import DetailModal from './components/DetailModal';
import Navbar from './components/Navbar';
import Home from './pages';
import Story from './pages/stories/[id]';
import ReadChapter from './pages/read/[id]';
import Search from './pages/search';
import HotStories from './pages/hot-stories';
import NewlyUpdated from './pages/newly-updated';
import Genres from './pages/genres';
import axios from 'axios';
import { imageProxyServer } from './constants/env-variables';

export const App: FunctionComponent = () => {
  const { key } = useLocation();
  const details = useStore((state: any) => state.details);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  useEffect(() => {
    // Start proxy server
    (async () => {
      await axios.get(`${imageProxyServer}?src=`);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <DetailModal story={details} />
      <div className='h-14'></div>
      <div className='bg-neutral-900 text-white px-20 pt-10 pb-12'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stories/:id' element={<Story />} />
          <Route path='/read/:name/:chapter/:id' element={<ReadChapter />} />
          <Route path='/search' element={<Search />} />
          <Route path='/hot-stories' element={<HotStories />} />
          <Route path='/newly-updated' element={<NewlyUpdated />} />
          <Route path='/genres' element={<Genres />} />
        </Routes>
      </div>
    </>
  );
};
