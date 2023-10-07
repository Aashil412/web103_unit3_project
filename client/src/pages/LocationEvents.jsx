import React, { useState, useEffect } from "react";
import LocationsAPI from "../services/LocationsAPI";
import EventsAPI from "../services/EventsAPI";
import Event from "../components/Event";
import "../css/LocationEvents.css";

const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationData = await LocationsAPI.getLocationById(index);
        const eventData = await EventsAPI.getEventsAtLocation(index);
        setLocation(locationData);
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [index]);

  return (
    <div className="location-events">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <header>
            <div className="location-image">
              <img src={location.image} alt={`${location.venue_name} image`} />
            </div>
            <div className="location-info">
              <h2>{location.venue_name}</h2>
              <p>{location.venue_address}</p>
            </div>
          </header>
          <main>
            {events.length > 0 ? (
              events.map((event) => <Event key={event.id} event={event} />)
            ) : (
              <h2>
                <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
                {"No events scheduled at this location yet!"}
              </h2>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default LocationEvents;
