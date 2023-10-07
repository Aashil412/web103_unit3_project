import React, { useEffect, useState } from "react";
import EventsAPI from "../services/EventsAPI";
import Event from "../components/Event";
import "../css/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventsAPI.getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      {loading ? (
        <h2>Loading...</h2>
      ) : events.length > 0 ? (
        events.map((event) => <Event key={event.id} event={event} />)
      ) : (
        <h2>
          <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
          {"No events found!"}
        </h2>
      )}
    </div>
  );
};

export default Events;
