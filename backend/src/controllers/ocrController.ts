import { Request, Response } from "express";
import { detectText } from "../service/dataHandler";
import { verifyAndFormatText } from "../service/aiService";

export const scanDocHandler = async (req: Request, res: Response) => {
  try {
    const frontFile = (req.files as any)?.front?.[0];
    const backFile = (req.files as any)?.back?.[0];
    if (!frontFile || !backFile) {
      return res
        .status(400)
        .json({ message: "Both front and back images are required" });
    }

    const frontResult = await detectText(frontFile.buffer);
    const backResult = await detectText(backFile.buffer);

    if (!frontResult || !backResult) {
      return res.status(400).json({
        message:
          "Image could not be processed! Please make sure the image is clear and high resolution.",
      });
    }

    const data = await verifyAndFormatText(frontResult, backResult);
    console.log(data);
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Something went wrong!" });
  }
};
