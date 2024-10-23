import { useEffect } from 'react';
import useStateLogic from 'hooks/useStateLogic';
import useColumsData from 'hooks/useColumnsData';
import DevelopmentTable from '../tables/components/DevelopmentTable';
import Banner from '../../../components/banner/Banner';
import SearchBar from './components/SearchBar';

const Dashboard = () => {
  const {
    fetchInitialData,
    currentPage,
    setCurrentPage,
    nextPageData,
    filteredResults,
    resultsLoading,
    count,
    legacyRepos,
    trendingRepos,
    filterText,
    setFilterText,
    clearSearch,
  } = useStateLogic();

  useEffect(() => {
    fetchInitialData(true);
  }, []);

  return (
    <div className={`${JSON.parse(process.env.REACT_APP_TB_ALLOWED) ? '' : 'pt-10'} min-h-screen`}>
      <div className="lg:px-1 xl:px-9 items-end mb-2">
        <Banner />
      </div>
      <div className="lg:px-1 xl:px-9 items-end mb-2" />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-1 lg:px-1 xl:px-9">
        <SearchBar
          filterText={filterText}
          setFilterText={setFilterText}
          clearSearch={clearSearch}
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
            nextPageData={nextPageData}
            columnsData={useColumsData}
            tableData={filteredResults || []}
            title="Issues needing tissues"
          />
        ) : ''}
      </div>
    </div>
  );
};

export default Dashboard;
