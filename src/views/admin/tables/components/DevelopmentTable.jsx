/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */

// TODO Long, refactor logic and create some of the columns into reusable components
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/card';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { MdTextSnippet } from 'react-icons/md';
import Trending from 'views/admin/default/components/Trending';
import Legacy from 'views/admin/default/components/Legacy';
import useKeyDown from 'hooks/useKeyDown';
import RepoDetails from './RepoDetails';

const DevelopmentTable = (props) => {
  const {
    columnsData,
    tableData,
    isLoading,
    resultsLoading,
    canNextPage,
    pageIndex,
    setCurrentPage,
    canPreviousPage,
    title,
    count,
    legacyRepos,
    trendingRepos,
  } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    // getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageSize },
  } = tableInstance;

  const [activeIssue, setActiveIssue] = useState(null);
  const [fullscreen, setFullscreen] = useState(true);

  const [expanded, setExpanded] = useState(false);
  const [legacyExpanded, setLegacyExpanded] = useState(false);

  const [activeRepo, setActiveRepo] = useState(null);

  const toggleExpansion = () => {
    if (activeRepo) {
      setActiveRepo(() => null);
    } else {
      setExpanded(!expanded);
    }
  };

  const toggleLegacyExpansion = () => {
    if (activeRepo) {
      setActiveRepo(() => null);
    } else {
      setLegacyExpanded(!legacyExpanded);
    }
  };

  const killTabs = () => {
    if (expanded) {
      setExpanded(false);
    }
    if (legacyExpanded) {
      setLegacyExpanded(false);
    }
    setActiveRepo(() => null);
  };

  return (
    <Card extra="w-full h-full">
      {expanded || legacyExpanded ? (
        <div>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70"
            onClick={() => { setActiveIssue(null); killTabs(); }}
            onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setActiveIssue(null), killTabs])}
            tabIndex={0}
            role="button"
            aria-label="See repo details"
          />
        </div>
      ) : ''}
      <Trending
        toggleExpansion={toggleExpansion}
        expanded={expanded}
        data={trendingRepos}
      />
      {!expanded ? (
        <Legacy
          toggleExpansion={toggleLegacyExpansion}
          expanded={legacyExpanded}
          activeRepo={activeRepo}
          setActiveRepo={setActiveRepo}
          data={legacyRepos}
        />
      ) : ''}

      {resultsLoading ? (
        <div className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70" />
      ) : ''}

      {activeIssue && (
        <RepoDetails
          activeIssue={activeIssue}
          setActiveIssue={setActiveIssue}
          setFullscreen={setFullscreen}
          fullscreen={fullscreen}
          killTabs={killTabs}
        />
      )}

      <div
        className="relative flex items-center justify-between px-4 pt-4"
        onClick={() => killTabs()}
        onKeyDown={(e) => useKeyDown(e, 'Enter', [killTabs])}
        role="button"
        tabIndex={0}
        aria-label="Close tabs"
      >
        <div className="text-xl font-bold text-white w-half">
          <div className="flex wrap justify-between items-center">
            <span>
              {title}
              {' '}
              <span className="text-sm text-gray-600">
                (
                {count}
                )
              </span>
            </span>
          </div>
        </div>
        <div className="flex justify-end items-center ">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={!canPreviousPage || resultsLoading}
            className={`mr-2 px-3 py-1 ${canPreviousPage && !resultsLoading ? 'bg-orange-0/80' : 'bg-gray-0'} text-white rounded-md transition duration-200`}
          >
            Previous
          </button>
          <span>
            Page
            {' '}
            <strong>
              {pageIndex + 1}
              {' '}
              of
              {' '}
              {Math.ceil(count / pageSize)}
            </strong>
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!canNextPage || resultsLoading}
            className={`ml-2 px-3 py-1 ${canNextPage && !resultsLoading ? 'bg-orange-0/80' : 'bg-gray-0'} text-white rounded-md transition duration-200`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
        {isLoading
          ? (
            <div className="flex-wrap justify-center items-center z-50">
              <div className="w-full flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-0/80" />
              </div>
              <div className="w-full flex justify-center pt-2">
                <p className="">Loading</p>
              </div>
            </div>
          )
          : (
            <table
              // {...getTableProps()}
              className="mt-2 h-max w-full"
              variant="simple"
              color="gray-500"
              mb="24px"
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  // TODO Find better key than index
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, idx) => (
                      <th
                      // Removed sorting by column
                      // {...column.getHeaderProps(column.getSortByToggleProps())}
                        {...column.getHeaderProps()}
                        className="border-b pr-2 pb-[10px] text-start !border-gray-0 "
                        key={idx}
                      >
                        <div className="text-xs font-bold tracking-wide text-gray-600 p-4">
                          {column.render('Header')}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={index} className="cursor-pointer hover:bg-orange-0/60 w-full transition duration-300">
                      {row.cells.map((cell, index) => {
                        let data = '';
                        if (cell.column.Header === 'REPO NAME') {
                          data = (
                            <div
                              className="flex wrap items-center"
                              onClick={() => { setActiveIssue(row.original); killTabs(); }}
                              onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setActiveIssue(row.original), killTabs])}
                              role="button"
                              tabIndex={0}
                            >
                              <img
                                className="h-10 w-10 rounded-full cursor-pointer mr-2"
                                src={row.original.owner_raw.avatar_url}
                                alt={row.original.owner_raw.login}

                              />
                              <p className="text-sm font-bold text-white">
                                {cell.value}
                              </p>
                            </div>
                          );
                        } else if (cell.column.Header === 'LINK') {
                          data = (
                            <span className="flex relative z-60">
                              <a
                                className="text-sm font-bold text-white bg-black text-center pl-2"
                                href={cell.value}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {/* 📖 */}
                                <MdTextSnippet className="text-white-500 text-lg" />
                              </a>

                            </span>

                          );
                        } else if (cell.column.Header === 'CREATED AT') {
                          data = (
                            <div
                              className="text-white"
                              onClick={() => { setActiveIssue(row.original); killTabs(); }}
                              onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setActiveIssue(row.original), killTabs])}
                              role="button"
                              tabIndex={0}
                            >
                              {cell.value && cell.value.slice(0, 10)}
                            </div>
                          );
                        } else if (cell.column.Header === 'DESCRIPTION') {
                          data = (
                            <div
                              className="flex wrap items-start"
                              onClick={() => { setActiveIssue(row.original); killTabs(); }}
                              onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setActiveIssue(row.original), killTabs])}
                              role="button"
                              tabIndex={0}
                            >
                              <img
                                className="h-10 w-10 rounded-full cursor-pointer mr-2"
                                src={row.original.user.avatar_url}
                                alt={row.original.user.login}
                              />
                              <p className="text-[14px] pr-12 text-white max-w-[400px] overflow-x-hidden">
                                {cell.value && cell.value.length > 99 ? `${cell.value.substring(0, 100).trim()}...` : cell.value}
                              </p>
                            </div>
                          );
                        } else if (cell.column.Header === 'ISSUE TITLE') {
                          data = (

                            <div
                              className="text-[14px] pr-12 text-white max-w-[400px] overflow-x-hidden"
                              onClick={() => { setActiveIssue(row.original); killTabs(); }}
                              onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setActiveIssue(row.original), killTabs])}
                              role="button"
                              tabIndex={0}
                            >
                              {cell.value && cell.value.length > 99 ? `${cell.value.substring(0, 100).trim()}...` : cell.value}
                            </div>

                          );
                        } else {
                          data = (
                            <div
                              className="text-[14px] pr-12 text-white"
                              onClick={() => { setActiveIssue(row.original); killTabs(); }}
                              onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setActiveIssue(row.original), killTabs])}
                              role="button"
                              tabIndex={0}
                            >
                              {cell.value}
                            </div>
                          );
                        }
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={index}
                            className="pt-[14px] pb-3 text-[14px] p-4"
                          >
                            {data}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-end items-center mt-4 p-4">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={!canPreviousPage || resultsLoading}
          className={`mr-2 px-3 py-1 ${canPreviousPage && !resultsLoading ? 'bg-orange-0/80' : 'bg-gray-0'} text-white rounded-md transition duration-200`}
        >
          Previous
        </button>
        <span>
          Page
          {' '}
          <strong>
            {pageIndex + 1}
            {' '}
            of
            {Math.ceil(count / pageSize)}
          </strong>
        </span>
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!canNextPage || resultsLoading}
          className={`ml-2 px-3 py-1 ${canNextPage && !resultsLoading ? 'bg-orange-0/80' : 'bg-gray-0'} text-white rounded-md transition duration-200`}
        >
          Next
        </button>
      </div>
    </Card>
  );
};

DevelopmentTable.propTypes = {
  columnsData: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  resultsLoading: PropTypes.bool,
  canNextPage: PropTypes.bool,
  canPreviousPage: PropTypes.bool,
  pageIndex: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  legacyRepos: PropTypes.arrayOf(PropTypes.object),
  trendingRepos: PropTypes.arrayOf(PropTypes.object),
};

DevelopmentTable.defaultProps = {
  columnsData: [],
  tableData: [],
  isLoading: false,
  resultsLoading: true,
  canNextPage: false,
  canPreviousPage: false,
  pageIndex: 0,
  count: 0,
  legacyRepos: [],
  trendingRepos: [],
};

export default DevelopmentTable;
