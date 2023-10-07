import express from "express";
import EventsController from "../controllers/events.js";

const router = express.Router();

router.get("/", EventsController.getEvents);
router.get("/:eventId", EventsController.getEventsById);
router.get("/locations/:locationId", EventsController.getEventsAtLocation);

export default router;
