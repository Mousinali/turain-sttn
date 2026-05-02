import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import AppRouter from './app/AppRouter'
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </HelmetProvider>
  </StrictMode>,
)