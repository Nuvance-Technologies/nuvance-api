import { Router } from 'express';
import { addPortfolioProject, getAllPortfolioProjects } from '../controllers/PortfolioController';

export const PortfolioRouter = Router();

PortfolioRouter.post("/add" , addPortfolioProject);
PortfolioRouter.get("/" , getAllPortfolioProjects)