import { Router } from "express";
import { scanDocHandler } from "../controllers/ocrController";
import { upload } from "../service/multerService";
export const ocrRoute = Router();

ocrRoute.post(
  "/scandoc",
  upload.fields([{ name: "front" }, { name: "back" }]),
  scanDocHandler
);

export default ocrRoute;
