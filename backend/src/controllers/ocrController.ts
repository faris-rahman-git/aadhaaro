import { Request, Response } from "express";
import { detectText } from "../service/dataHandler";
import { verifyAndFormatText } from "../service/aiService";
import { StatusCode } from "../constant/Status/StatusCode";
import { MessageConst } from "../constant/Message/MessageConst";

export const scanDocHandler = async (req: Request, res: Response) => {
  try {
    let frontFile;
    let backFile;

    if (req.files && !Array.isArray(req.files)) {
      const frontFiles = req.files.front;
      const backFiles = req.files.back;

      frontFile = frontFiles ? frontFiles[0] : undefined;
      backFile = backFiles ? backFiles[0] : undefined;
    }
    if (!frontFile || !backFile) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: MessageConst.BOTH_FRONT_AND_BACK_IMAGES_REQUIRED });
    }

    const frontResult = await detectText(frontFile.buffer);
    const backResult = await detectText(backFile.buffer);

    if (!frontResult || !backResult) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: MessageConst.IMAGE_COULD_NOT_BE_PROCESSED,
      });
    }

    const data = await verifyAndFormatText(frontResult, backResult);
    return res.status(StatusCode.OK).json({ data });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCode.SERVER_ERROR)
      .json({ message: MessageConst.SOMETHING_WENT_WRONG });
  }
};
