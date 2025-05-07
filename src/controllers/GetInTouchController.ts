import { Request, Response } from "express";
import { getInTouchValidationSchema } from "../utils/zodSchema";
import prisma from "../db/prisma";

export const AddData = async (req: Request, res: Response) => {
    try {
        // Input Validation Via ZOD:

        const result = getInTouchValidationSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const { fullname, companyName, email, contactNumber, projectType, projectDescription, EstimatedBudget, timeline, contactMethod, additionalInfo } = result.data;

        // adding data to database!!
        const getInTouch = await prisma.getInTouchResponse.create({
            data: {
                fullname,
                companyName,
                email,
                contactNumber,
                projectType,
                projectDescription,
                EstimatedBudget,
                timeline,
                contactMethod,
                additionalInfo,
            }
        });

        res.status(200).json({
            message: `successfully ${getInTouch.fullname}'s Get in Touch Data Recorded!!`,
            fullName: getInTouch.fullname, 
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
}


export const GetAll = async (req: Request, res: Response) => {
    try {
        const DATA = await prisma.getInTouchResponse.findMany();
        
        res.status(200).json(DATA);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
}   