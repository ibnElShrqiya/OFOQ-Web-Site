import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AdminApp from './AdminApp.tsx';

createRoot(document.getElementById('root')!).render(window.location.pathname.replace(/\/$/, '') === '/admin' ? <AdminApp /> : <App />);
