import { Router } from "express";
import { logout, me, signin, signup } from "../controllers/AdminController";
import { AdminAuth } from "../middlewares/AdminAuthentication";

export const AdminRouter = Router();

AdminRouter.post("/signup" , signup);
AdminRouter.post("/signin" , signin);
AdminRouter.post("/logout" , logout);
AdminRouter.get("/me" , AdminAuth , me);