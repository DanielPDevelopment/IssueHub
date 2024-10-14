import { useState, useEffect, useRef } from 'react';
import { fetchSearch } from 'hooks/useGetRepos';
import PropTypes from 'prop-types';

const SearchBar = ({
  setFilteredResults, setResultsLoading, setCount, currentPage, setCurrentPage,
}) => {
  const timerRef = useRef(null);
  const [filterText, setFilterText] = useState('');

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

  const clearSearch = async () => {
    setFilterText(() => '');
    setCurrentPage(null);
    const data = await fetchSearch('', 0);
    setFilteredResults(data.repos);
    setCount(() => data.count || null);
  };

  const handleSearchChange = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      getData(false);
    }, 1000);
  };

  useEffect(() => {
    if (filterText.length > 0) {
      handleSearchChange();
    }
  }, [filterText]);

  useEffect(() => {
    if (currentPage !== null) {
      getData(true);
    }
  }, [currentPage]);

  return (
    <div>
      <div className="relative text-gray-0 mb-0 pb-0">
        <input
          type="text"
          placeholder="Search Issues"
          className="w-full py-2 px-4 bg-white bg-opacity-80 rounded-lg shadow-md text-gray-0
                      focus:outline-none focus:bg-white focus:bg-opacity-80 focus:ring-2 focus:ring-gray-900
                      ::placeholder:text-red-500"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        {filterText && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 p-2 focus:outline-none"
            onClick={clearSearch}
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
  );
};

SearchBar.propTypes = {
  setFilteredResults: PropTypes.func.isRequired,
  setResultsLoading: PropTypes.func.isRequired,
  setCount: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  currentPage: 0,

};

export default SearchBar;
