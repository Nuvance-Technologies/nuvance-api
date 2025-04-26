import { Router } from "express";
import { signup } from "../controllers/AdminController";

export const AdminRouter = Router();

AdminRouter.post("/signup" , signup);