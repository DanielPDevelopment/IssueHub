/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import Footer from 'components/footer/Footer';
import routes from 'routes.js';

const Admin = () => {
  const getRoutes = (rt) => rt.map((prop, key) => {
    if (prop.layout === '/admin') {
      return (
        <Route path={`/${prop.path}`} element={prop.component} key={key} />
      );
    }
    return null;
  });

  document.documentElement.dir = 'ltr';
  return (
    <div className="flex h-full w-full min-h-screen bg-darkMainBG">

      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-darkMainBG min-h-screen">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all ${process.env.REACT_APP_SB_VISIBLE === 'true' && 'md:pr-2 xl:ml-[313px]'} min-h-screen `}
        >
          {/* Routes */}
          <div className="h-full min-h-screen">
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
