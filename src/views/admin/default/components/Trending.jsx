import { useEffect, useState } from 'react';
import ZombieCard from 'components/card/ZombieCard';
import PropTypes from 'prop-types';

import { fetchTrending } from 'hooks/useGetRepos';
import useKeyDown from 'hooks/useKeyDown';

const Trending = ({ toggleExpansion, expanded }) => {
  const [data, setData] = useState(null);

  const getTrending = async () => {
    const receivedData = await fetchTrending();
    setData(() => receivedData);
  };

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <div className="hidden md:block z-50">
      <div
        className={`${!expanded ? 'left-0' : '-left-full'} fixed top-[10px] left-0 z-50 p-2 rounded-r-full shadow-md cursor-pointer bg-white bg-opacity-80`}
        onClick={toggleExpansion}
        onKeyDown={(e) => useKeyDown(e, 'Enter', [toggleExpansion])}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center justify-center w-8 h-[32px] rounded-full bg-gray-200 bg-opacity-70 hover:bg-gray-light">
          <p className="text-gray-500 text-2xl">⚡</p>
        </div>
      </div>
      <div className={`fixed top-[10px] ${expanded ? 'left-0 md:w-[80.33%] sm:w-[50%] h-auto' : '-left-full md:w-[0px]'} z-50  bg-gray-light shadow-xl`}>
        <div className="px-4 py-8">
          <h1 className={`${!expanded ? 'hidden' : 'block'} text-base text-white bg-opacity-80 text-2xl px-12`}>Trending Repos</h1>
          <p className="pl-12 text-white text-gray-400 text-sm">These repos have had the most comments and/or issues the last 30 days!</p>
          <div className="z-20 grid grid-cols-1 gap-6 md:grid-cols-5 px-10 py-4 h-full">
            {data && data.length ? (data.map((item) => (
              <ZombieCard
                key={item._id}
                url={item.html_url}
                title={item.name || ''}
                description={item.description || ''}
                language={item.raw.language || ''}
                image={item.avatar_url}
                clickable
                clickAction={() => window.open(item.html_url, '_blank')}
              />
            ))) : ''}
          </div>
        </div>
      </div>
      <div
        className={`fixed top-[10px] ${expanded ? 'md:left-[80.33%] sm:left-[50%] bg-gray-light bg-opacity-100' : '-left-full'} z-50 p-2 rounded-r-full shadow-md cursor-pointer bg-white bg-opacity-80`}
        onClick={toggleExpansion}
        onKeyDown={(e) => useKeyDown(e, 'Enter', [toggleExpansion])}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center justify-center w-10 h-[32px] rounded-full bg-gray-200 bg-opacity-70 hover:bg-gray-light">
          <p className="text-gray-500 text-2xl">⚡</p>
        </div>
      </div>
    </div>
  );
};

Trending.propTypes = {
  toggleExpansion: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default Trending;
