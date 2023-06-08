import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider, removeOldestQuery } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import './index.css';
import App from './App';

const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: THIRTY_DAYS,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'ESPN_PODCAST_FEED',
  retry: removeOldestQuery
});

const persistOptions = {
  persister: localStoragePersister,
  maxAge: THIRTY_DAYS,
};


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      <App />
    </PersistQueryClientProvider>
  </StrictMode>,
);
