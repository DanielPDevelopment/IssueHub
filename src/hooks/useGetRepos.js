const API = JSON.parse(process.env.REACT_APP_IS_DEV)
  ? process.env.REACT_APP_DEV_DOMAIN : process.env.REACT_APP_PROD_DOMAIN;

export async function fetchRepos() {
  try {
    const response = await fetch(`${API}api/repos/data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ API - Repos - Collection: ${error.message}`);
    return [];
  }
}

export async function fetchSearch(userData, page = 0) {
  const filteredData = {
    filterText: userData,
    page,
  };
  let data;
  try {
    const response = await fetch(`${API}api/repos/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredData),
    });
    data = await response.json();
  } catch (error) {
    console.error(`❌ API - Repos - Search: ${error.message}`, { escape: false });
  }
  return data;
}
