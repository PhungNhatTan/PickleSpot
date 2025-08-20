import CourtModel from "../models/CourtModel.js";

export async function getCourts(req, res) {
  try {
    const courts = await CourtModel.findAll();
    res.json(courts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courts" });
  }
}

export async function createCourt(req, res) {
  try {
    const { Name, OwnerId } = req.body;
    const court = await CourtModel.create({ Name, OwnerId });
    res.status(201).json(court);
  } catch (error) {
    res.status(400).json({ error: "Failed to create court" });
  }
}
