import { render } from 'preact';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/tailwind.css';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app') as HTMLElement
);
