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

const getLocations = async (req, res) => {
  const result = await executeQuery("SELECT * FROM locations ORDER BY id ASC");
  result.error ? res.status(409).json({ error: result.error }) : res.status(200).json(result.data);
};

const getLocationById = async (req, res) => {
  const selectQuery = `
    SELECT venue_name, venue_address, image
    FROM locations
    WHERE id=$1
  `;
  const locationId = req.params.locationId;
  const result = await executeQuery(selectQuery, [locationId]);
  result.error ? res.status(409).json({ error: result.error }) : res.status(200).json(result.data[0]);
};

export default {
  getLocations,
  getLocationById,
};