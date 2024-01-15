import time from "@/constants/time";
import connectMongoDB from "@/libs/mongodb";
import { Level4 } from "@/models/level4";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }
    const teamName = "team1"; //Get team ID from db
    const startTime = Date.now();
    const endTime = startTime + 1000 * 60 * time.level4; //mins
    await connectMongoDB();
    const teamData = await Level4.findOne({ teamId: teamId});
    console.log(teamData.startTime);
    if (teamData.startTime === undefined || teamData.startTime === null) {
      await Level4.updateOne(
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
