/* eslint-disable react/no-array-index-key */
import React from 'react';
import Footer from 'components/footer/Footer';
import MainDashboard from 'views/admin/default';

const Admin = () => {
  document.documentElement.dir = 'ltr';
  return (
    <div className="flex h-full w-full min-h-screen bg-darkMainBG">

      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-darkMainBG min-h-screen">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all ${JSON.parse(process.env.REACT_APP_SB_VISIBLE) && 'md:pr-2 xl:ml-[313px]'} min-h-screen `}
        >
          <div className="h-full min-h-screen">
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <MainDashboard />
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
