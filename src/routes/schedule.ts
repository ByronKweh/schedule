import express, { Request, Response } from "express";
import { Schedule, scheduleSchema } from "../../models/schedule";

const router = express.Router();

router.get("/api/schedule", async (req: Request, res: Response) => {
  const schedule = await Schedule.find({});
  return res.status(200).send(schedule);
});

router.post("/api/schedule", async (req: Request, res: Response) => {
  const { title, description, startDate, endDate } = req.body;

  try {
    const schedule = Schedule.build({ title, description, startDate, endDate });
    await schedule.save();
    return res.status(201).send(schedule);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post("/api/schedule/:id", async (req: Request, res: Response) => {
  const { title, description, startDate, endDate } = req.body;
  const scheduleId = req.params.id;

  try {
    // Find the schedule item by ID and update its properties
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      {
        title,
        description,
        startDate,
        endDate,
      },
      { new: true } // To get the updated document after the update
    );

    if (!updatedSchedule) {
      return res.status(404).send({ error: "Schedule not found" });
    }

    return res.status(200).send(updatedSchedule);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// DELETE API route to delete a schedule item by ID
router.delete("/api/schedule/:id", async (req: Request, res: Response) => {
  const scheduleId = req.params.id;

  try {
    // Find the schedule item by ID and delete it
    const deletedSchedule = await Schedule.findByIdAndRemove(scheduleId);

    if (!deletedSchedule) {
      return res.status(404).send({ error: "Schedule not found" });
    }

    return res.status(204).send(); // 204 No Content response for successful deletion
  } catch (e) {
    return res.status(400).send(e);
  }
});

export { router as scheduleRouter };
