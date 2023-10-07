import "./dotenv.js"
import { pool } from "./database.js"
import eventsData from "../data/events.js"
import locationsData from "../data/locations.js"

const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      venue_name TEXT NOT NULL,
      venue_address TEXT NOT NULL,
      image TEXT NOT NULL
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log("🎉 locations table created successfully")
  } catch (err) {
    console.error("⚠️ error creating locations table", err)
  }
}

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      datetime timestamp NOT NULL,
      image text NOT NULL,
      location integer NOT NULL
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log("🎉 events table created successfully")
  } catch (err) {
    console.error("⚠️ error creating events table", err)
  }
}

const seedTables = async () => {
  await createLocationsTable()
  await createEventsTable()

  locationsData.forEach((location) => {
    const insertQuery = {
      text: "INSERT INTO locations (id, venue_name, venue_address, image) VALUES ($1, $2, $3, $4)",
    }

    const values = [
      location.id,
      location.venue_name,
      location.venue_address,
      location.image,
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting location", err)
        return
      }

      console.log(`✅ ${location.venue_name} added successfully`)
    })
  })

  eventsData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (title, datetime, image, location) VALUES ($1, $2, $3, $4)",
    }

    const values = [event.title, event.datetime, event.image, event.location]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event", err)
        return
      }

      console.log(`✅ ${event.title} added successfully`)
    })
  })
}

seedTables()
