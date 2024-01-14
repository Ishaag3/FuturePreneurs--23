import connectMongoDB from "@/libs/mongodb";
import { Level0 } from "@/models/level0";
import time from "@/constants/time";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }
    const teamName = "team1"; //Get team ID from db
    const startTime = Date.now();
    const endTime = startTime + 1000 * 60 * time.qualifiers; //mins
    await connectMongoDB();
    const teamData = await Level0.findOne({ teamName: teamName });
    console.log(teamData.startTime);
    if (teamData.startTime === undefined || teamData.startTime === null) {
      await Level0.updateOne(
        { teamName: teamName },
        { startTime: startTime, endTime: endTime }
      );
      return res
        .status(200)
        .json({
          message: "Time set successfully",
          startTime: startTime,
          endTime: endTime,
        });
    } else {
      return res.status(400).json({
        message: "Time already set",
        startTime: teamData.startTime,
        endTime: teamData.endTime,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Some error occured",
    });
  }
}