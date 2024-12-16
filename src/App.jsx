import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Resume from './pages/Resume';
import Generate from './pages/Generate';

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Resume />} />
      <Route path="generate-by" element={<Generate />} />
    </Routes>
  );
}
