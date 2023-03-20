import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { BooksDetailsPage, HomePage, NotFoundPage } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="books/:id" element={<BooksDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
