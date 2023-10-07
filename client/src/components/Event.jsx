import React, { useState, useEffect } from "react";
import moment from "moment";
import "../css/Event.css";
const Event = ({ event }) => {
  const [formattedTime, setFormattedTime] = useState('');
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    const dateTime = new Date(event.datetime);
    setFormattedTime(
      dateTime.toLocaleString([], {year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit"})
    );
  }, [event]);

  useEffect(() => {
    const momentTime = moment(new Date(event.datetime));
    setRemainingTime(momentTime.fromNow());
  }, [event]);


  return (
    <article className="event-information">
      <img src={event.image} />
      <div className="event-information-overlay">
        <div className="text">
          <h3>{event.title}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i>
            {formattedTime}
          </p>
          <p id={`remaining-${event.id}`}>{remainingTime}</p>
        </div>
      </div>
    </article>
  );
};

export default Event;
