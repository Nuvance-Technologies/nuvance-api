import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { portfolioValidationSchema } from '../utils/zodSchema';


export const addPortfolioProject = async (req: Request, res: Response) => {
    try {

        const result = portfolioValidationSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }
        const { title, description, testimonial, videoUrl, websiteUrl } = result.data;

        const PROJECT = await prisma.portfolioProjects.create({
            data: {
                title,
                description,
                testimonial,
                videoUrl,
                websiteUrl,
            }
        })

        res.status(200).json({
            message: `${PROJECT.title} successfully added!!`,
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
}


export const getAllPortfolioProjects = async (req: Request, res: Response) => {
    try {
        const DATA = await prisma.portfolioProjects.findMany();

        res.status(200).json(DATA);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
}