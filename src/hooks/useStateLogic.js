import { useState, useRef, useEffect } from 'react';
import { fetchRepos, fetchSearch } from 'hooks/useGetRepos';

const useStateLogic = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [nextPage, setNextPage] = useState(1);
  const [nextPageData, setNextPageData] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [legacyRepos, setLegacyRepos] = useState([]);
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [filterText, setFilterText] = useState('');

  const timerRef = useRef(null);

  const setLoading = (loading) => {
    setResultsLoading(loading);
  };

  const fetchInitialData = async (blurLoad) => {
    if (blurLoad) {
      setLoading(true);
    }
    const data = await fetchRepos('', 0);
    setFilteredResults(data.repos);
    setCount(data.count || 0);
    setLegacyRepos(data.legacy);
    setTrendingRepos(data.trending);
    if (blurLoad) {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchSearch(filterText, currentPage);
    setFilteredResults(data.repos);
    setCount(data.count || 0);
    setLoading(false);
  };

  const handleSearchChange = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(fetchData, 1000);
  };

  const clearSearch = async () => {
    setFilterText('');
    setCurrentPage(0);
    await fetchData();
  };

  useEffect(() => {
    if (filterText) handleSearchChange();
  }, [filterText]);

  useEffect(() => {
    if (currentPage != null) fetchData();
  }, [currentPage]);

  return {
    fetchInitialData,
    currentPage,
    setCurrentPage,
    nextPage,
    setNextPage,
    nextPageData,
    setNextPageData,
    filteredResults,
    resultsLoading,
    count,
    legacyRepos,
    trendingRepos,
    filterText,
    setFilterText,
    clearSearch,
  };
};

export default useStateLogic;
