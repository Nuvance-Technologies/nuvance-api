import { Router } from "express";
import { addDetails } from "../controllers/ContactController";

export const ContactRouter = Router();

ContactRouter.post("/" , addDetails)