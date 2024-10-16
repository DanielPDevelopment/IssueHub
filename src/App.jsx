import { Routes, Route } from 'react-router-dom';
import { useDocumentTitle, useDocumentDescription } from 'hooks/InfoAndMeta';

import AdminLayout from 'layouts/admin';

const App = () => {
  useDocumentTitle(process.env.REACT_APP_TITLE);
  useDocumentDescription(process.env.REACT_APP_DESCRIPTION);

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />} />
    </Routes>
  );
};

export default App;
