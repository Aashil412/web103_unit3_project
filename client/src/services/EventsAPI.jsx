const fetchEvents = async (url) => {
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

const getAllEvents = async () => {
  const url = 'http://localhost:3000/events';
  return await fetchEvents(url);
};

const getEventsById = async (id) => {
  const url = `http://localhost:3000/events/${id}`;
  return await fetchEvents(url);
};

const getEventsAtLocation = async (locationId) => {
  const url = `http://localhost:3000/events/locations/${locationId}`;
  return await fetchEvents(url);
};

export default {
  getAllEvents,
  getEventsById,
  getEventsAtLocation,
};