import { Router } from "express";
import { logout, signin, signup } from "../controllers/AdminController";

export const AdminRouter = Router();

AdminRouter.post("/signup" , signup);
AdminRouter.post("/signin" , signin);
AdminRouter.post("/logout" , logout);