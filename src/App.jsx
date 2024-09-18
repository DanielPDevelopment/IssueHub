// import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDocumentTitle, useDocumentDescription } from 'hooks/InfoAndMeta';

import AdminLayout from 'layouts/admin';

const App = () => {
  useDocumentTitle(process.env.REACT_APP_TITLE);
  useDocumentDescription(process.env.REACT_APP_DESCRIPTION);

  return (
    <Routes>
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
