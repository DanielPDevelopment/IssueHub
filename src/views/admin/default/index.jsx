import { useState } from 'react';
import DevelopmentTable from '../tables/components/DevelopmentTable';
import Banner from '../../../components/banner/Banner';
import SearchBar from './components/SearchBar';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [count, setCount] = useState(0);

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
