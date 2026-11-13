import { StoreProvider } from '@app/providers/StoreProvider';
import { PartsSearchPage } from '@pages/PartsSearchPage';

export default function App() {
  return (
    <StoreProvider>
      <PartsSearchPage />
    </StoreProvider>
  );
}