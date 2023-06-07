import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider, removeOldestQuery } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import './index.css';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'ESPN_PODCAST_FEED',
  retry: removeOldestQuery
});


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: localStoragePersister }}>
      <App />
    </PersistQueryClientProvider>
  </StrictMode>,
);
