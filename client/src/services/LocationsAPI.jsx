const fetchLocations = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const getAllLocations = async () => {
  const url = 'http://localhost:3000/locations';
  return await fetchLocations(url);
};

const getLocationById = async (id) => {
  const url = `http://localhost:3000/locations/${id}`;
  return await fetchLocations(url);
};

export default {
  getAllLocations,
  getLocationById,
};