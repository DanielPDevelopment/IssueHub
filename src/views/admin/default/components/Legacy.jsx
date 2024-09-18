import { useEffect, useState } from 'react';
import ZombieCard from 'components/card/ZombieCard';
import { fetchOld } from 'hooks/useGetRepos';
import PropTypes from 'prop-types';
import useKeyDown from 'hooks/useKeyDown';
import RepoGeneralInfo from './RepoGeneralInfo';

const Legacy = ({
  toggleExpansion, expanded, activeRepo, setActiveRepo,
}) => {
  const [data, setData] = useState(null);

  const getOld = async () => {
    const receivedData = await fetchOld();
    setData(() => receivedData);
  };

  useEffect(() => {
    getOld();
  }, []);

  return (
    <div className="hidden md:block z-50">
      <div
        className={`${!expanded ? 'left-0' : '-left-full'} fixed top-[70px] left-0 z-50 p-2 rounded-r-full shadow-md cursor-pointer bg-white bg-opacity-80`}
        onClick={toggleExpansion}
        onKeyDown={(e) => useKeyDown(e, 'Enter', [toggleExpansion])}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center justify-center w-8 h-[32px] rounded-full bg-gray-200 bg-opacity-70 hover:bg-gray-light">
          <p className="text-gray-500 text-2xl">🧟</p>
        </div>
      </div>
      <div className={`fixed top-[70px] ${expanded ? 'left-0 md:w-[80.33%] sm:w-[50%] h-auto' : '-left-full md:w-[0px]'} z-50  bg-gray-light shadow-xl`}>
        <div className="px-4 py-8">
          {activeRepo ? (
            <div>
              <div className={`fixed top-[70px] inset-0  ${activeRepo ? 'md:w-[90.33%]' : 'md:w-[80.33%]'} sm:w-[50%] z-50 items-end justify-center module-content scrollbar-hide`}>
                <div className="h-4/5 shadow-lg border-orange-0/80 border-[0.05px] border-l-[0px]  overflow-scroll bg-gray-light module-content scrollbar-hide">
                  <RepoGeneralInfo
                    issue={activeRepo || {}}
                    setActiveIssue={setActiveRepo}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className={`${!expanded ? 'hidden' : 'block'} text-base text-white bg-opacity-80 text-2xl px-12`}>Zombie Repos</h1>
              <p className="pl-12 text-white text-gray-400 text-sm">These repos have old issues that haven&apos;t been addressed yet</p>
              <div className="z-20 grid grid-cols-1 gap-6 md:grid-cols-5 px-10 py-4 h-full">
                {data && data.length ? (data.map((item) => (
                  <ZombieCard
                    key={item._id}
                    url={item.raw.issue_url}
                    title={item.name}
                    language={item.raw.language ? item.raw.language : ''}
                    description={item.raw.issue_title ? item.raw.issue_title : ''}
                    price="0.91"
                    image={item.avatar_url}
                    setActiveRepo={setActiveRepo}
                    raw={item.raw ? item.raw : {}}
                    clickable
                    clickAction={() => setActiveRepo(() => item.raw)}
                  />
                ))) : ''}
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={`fixed top-[70px] ${expanded && !activeRepo ? 'md:left-[80.23%] sm:left-[50%] bg-gray-light bg-opacity-100' : '-left-full'} ${expanded && activeRepo ? 'md:left-[90.23%] sm:left-[50%] bg-gray-light bg-opacity-100 border-orange-0/80 border-[0.05px] border-l-[0px]' : ''} z-50 p-2 rounded-r-full shadow-md cursor-pointer bg-white bg-opacity-80`}
        onClick={() => {
          toggleExpansion();
          setActiveRepo(() => null);
        }}
        onKeyDown={(e) => useKeyDown(e, 'Enter', [toggleExpansion, () => setActiveRepo(() => null)])}
        tabIndex={0}
        role="button"
      >
        <div className="flex items-center justify-center w-10 h-[32px] rounded-full bg-gray-200 bg-opacity-70 hover:bg-gray-light">
          <p className="text-gray-500 text-2xl">🧟</p>
        </div>
      </div>
    </div>
  );
};

Legacy.propTypes = {
  toggleExpansion: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  activeRepo: PropTypes.node,
  setActiveRepo: PropTypes.func.isRequired,
};

Legacy.defaultProps = {
  activeRepo: {},
};

export default Legacy;
