import mongoose from "mongoose";
import { DateTime } from "luxon"; // Using Luxon for handling time zones

interface ISchedule {
  title: string;
  description: string;
  startDate: DateTime; // Use DateTime for time zones
  endDate: DateTime; // Use DateTime for time zones
}

interface ScheduleModelInterface extends mongoose.Model<ScheduleDoc> {
  build(attr: ISchedule): ScheduleDoc;
}

interface ScheduleDoc extends mongoose.Document {
  title: string;
  description: string;
  startDate: DateTime;
  endDate: DateTime;
}

export const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value: any) {
        // Custom validation logic for startDate
        //@ts-ignore
        return value instanceof Date && !isNaN(value);
      },
      message: "Invalid startDate format",
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value: any) {
        // Custom validation logic for endDate
        //@ts-ignore
        return value instanceof Date && !isNaN(value);
      },
      message: "Invalid endDate format",
    },
  },
});

scheduleSchema.statics.build = (attr: ISchedule) => {
  return new Schedule(attr);
};

const Schedule = mongoose.model<ScheduleDoc, ScheduleModelInterface>(
  "Schedule",
  scheduleSchema
);

Schedule.build({
  title: "Schedule Title",
  description: "Schedule Description",
  startDate: DateTime.fromISO("2023-09-15T08:00:00", {
    zone: "America/New_York",
  }), // Example time zone
  endDate: DateTime.fromISO("2023-09-15T10:00:00", {
    zone: "America/New_York",
  }), // Example time zone
});

export { Schedule };
