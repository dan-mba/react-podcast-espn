import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import './index.css';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage })


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: localStoragePersister }}>
      <App />
    </PersistQueryClientProvider>
  </StrictMode>,
);
