import { useState, useEffect } from 'react';
import { fetchRepos } from 'hooks/useGetRepos';
import DevelopmentTable from '../tables/components/DevelopmentTable';
import Banner from '../../../components/banner/Banner';
import SearchBar from './components/SearchBar';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [legacyRepos, setLegacyRepos] = useState([]);
  const [trendingRepos, setTrendingRepos] = useState([]);

  const getData = async (blurLoad) => {
    if (blurLoad) {
      setResultsLoading(() => true);
    }
    const data = await fetchRepos('', 0);
    setFilteredResults(data.repos);
    setCount(() => data.count || null);
    setLegacyRepos(data.legacy);
    setTrendingRepos(data.trending);
    if (blurLoad) {
      setResultsLoading(() => false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`${JSON.parse(process.env.REACT_APP_TB_ALLOWED) ? '' : 'pt-10'} min-h-screen`}>

      <div className="lg:px-1 xl:px-9 items-end mb-2">
        <Banner />
      </div>

      <div className="lg:px-1 xl:px-9 items-end mb-2" />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-1 lg:px-1 xl:px-9">
        <SearchBar
          setFilteredResults={setFilteredResults}
          setResultsLoading={setResultsLoading}
          setCount={setCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {filteredResults && filteredResults !== null ? (
          <DevelopmentTable
            isLoading={!!resultsLoading}
            count={count}
            pageIndex={currentPage}
            setCurrentPage={setCurrentPage}
            canNextPage={(count > ((currentPage + 1) * 15))}
            canPreviousPage={(((currentPage + 1) * 15) > 15)}
            resultsLoading={resultsLoading}
            legacyRepos={legacyRepos}
            trendingRepos={trendingRepos}
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
                filteredResults || []
              }
            title="Issues needing tissues"
          />
        ) : ''}
      </div>
    </div>
  );
};

export default Dashboard;
