import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Books from "../../Pages/Books";
import OneBook from "../../Pages/oneBook";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<OneBook />} />
      <Route path="*" element={<Navigate to="/books" />} />
    </Routes>
  );
};
export default AppRouter;
