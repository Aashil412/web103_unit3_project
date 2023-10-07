import { pool } from "../config/database.js";

const executeQuery = async (query, params) => {
  try {
    const results = await pool.query(query, params);
    return { data: results.rows };
  } catch (error) {
    console.error('Database query error:', error);
    return { error: error.message };
  }
};

const getEvents = async (req, res) => {
  const result = await executeQuery("SELECT * FROM events ORDER BY id ASC");
  result.error ? res.status(409).json({ error: result.error }) : res.status(200).json(result.data);
};

const getEventsById = async (req, res) => {
  const selectQuery = `
    SELECT title, datetime, image, location
    FROM events
    WHERE id=$1
  `;
  const eventId = req.params.eventId;
  const result = await executeQuery(selectQuery, [eventId]);
  result.error ? res.status(409).json({ error: result.error }) : res.status(200).json(result.data[0]);
};

const getEventsAtLocation = async (req, res) => {
  const selectQuery = `
    SELECT title, datetime, image
    FROM events
    WHERE location=$1
  `;
  const locationId = req.params.locationId;
  const result = await executeQuery(selectQuery, [locationId]);
  result.error ? res.status(409).json({ error: result.error }) : res.status(200).json(result.data);
};

export default {
  getEvents,
  getEventsById,
  getEventsAtLocation,
};