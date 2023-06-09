import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient, removeOldestQuery } from '@tanstack/react-query-persist-client';
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


persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: THIRTY_DAYS
})


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
