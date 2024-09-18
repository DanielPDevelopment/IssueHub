import { useEffect, useState, useRef } from 'react';
import DevelopmentTable from '../tables/components/DevelopmentTable';
import { fetchSearch } from '../../../hooks/useGetRepos';
import Banner from '../../../components/banner/Banner';

const Dashboard = () => {
  const [filteredResults, setFilteredResults] = useState(null);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const timerRef = useRef(null);

  const [filterText, setFilterText] = useState(() => '');

  // TODO Refactor logic into a hook

  const getData = async (blurLoad) => {
    if (blurLoad) {
      setResultsLoading(() => true);
    }
    const data = await fetchSearch(filterText, currentPage);
    setFilteredResults(data.repos);
    setCount(() => data.count || null);
    if (blurLoad) {
      setResultsLoading(() => false);
    }
  };

  const handleSearchChange = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setCurrentPage(0);
      getData(false);
    }, 1000);
  };

  useEffect(() => {
    handleSearchChange();
  }, [filterText]);

  useEffect(() => {
    getData();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    getData(true);
  }, [currentPage]);

  return (
    <div className={`${JSON.parse(process.env.REACT_APP_TB_ALLOWED) ? '' : 'pt-10'} min-h-screen`}>

      <div className="lg:px-1 xl:px-9 items-end mb-2">
        <Banner />
      </div>

      <div className="lg:px-1 xl:px-9 items-end mb-2" />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-1 lg:px-1 xl:px-9">

        <div>
          <div className="relative text-gray-0 mb-0 pb-0">
            <input
              type="text"
              placeholder="Search Issues"
              className="w-full py-2 px-4 bg-white bg-opacity-80 rounded-lg shadow-md text-gray-0
                      focus:outline-none focus:bg-white focus:bg-opacity-80 focus:ring-2 focus:ring-gray-900
                      ::placeholder:text-red-500" // Apply red color to placeholder text
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            {filterText && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 p-2 focus:outline-none"
                onClick={() => {
                  setFilterText('');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.121 8.121a.5.5 0 01.707 0L10 10.293l1.172-1.172a.5.5 0 01.707.707L10.707 11l1.172 1.172a.5.5 0 01-.707.707L10 11.707l-1.172 1.172a.5.5 0 01-.707-.707L9.293 11l-1.172-1.172a.5.5 0 010-.707z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          <span className="text-sm italic text-gray-300">
            {'Seach help: title:<title> || name:<repo name> || language:<language> || description:<issue description> || <keyword to search>'}
            {' '}
          </span>
        </div>

        {filteredResults && filteredResults !== null ? (
          <DevelopmentTable
            isLoading={!!resultsLoading}
            count={count}
            pageIndex={currentPage}
            setCurrentPage={setCurrentPage}
            canNextPage={(count > ((currentPage + 1) * 15))}
            canPreviousPage={(((currentPage + 1) * 15) > 15)}
            resultsLoading={resultsLoading}
            columnsData={[
              {
                Header: 'REPO NAME',
                accessor: 'name',
              },
              {
                Header: 'ISSUE TITLE',
                accessor: 'issue_title',
              },
              {
                Header: 'CREATED AT',
                accessor: 'created_at',
              },
              {
                Header: 'CURRENT STATE',
                accessor: 'state',
              },
              {
                Header: 'LANGUAGE',
                accessor: 'language',
              },
              {
                Header: 'WATCHERS',
                accessor: 'watchers',
              },
              {
                Header: 'DESCRIPTION',
                accessor: 'body',
              },
              {
                Header: 'LINK',
                accessor: 'issue_url',
              },
            ]}
            tableData={
                filteredResults
              }
            title="Issues needing tissues"
          />
        ) : ''}
      </div>
    </div>
  );
};

export default Dashboard;
