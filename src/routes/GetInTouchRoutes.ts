import { Router } from "express";
import { AddData, GetAll } from "../controllers/GetInTouchController";

export const GetInTouchRouter = Router();

GetInTouchRouter.post("/add" , AddData);
GetInTouchRouter.get("/", GetAll)