import { Request, Response } from "express";
import { contactValidationSchema } from "../utils/zodSchema";
import prisma from "../db/prisma";

export const addDetails = async (req: Request, res: Response) => {
    try {
        const result = contactValidationSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const { firstName, lastName, email, contactNumber, companyName, companySize, howWeCanHelp } = result.data;

        // adding data to database!!
        const getInTouch = await prisma.contactUsResponse.create({
            data: {
                firstName,
                lastName,
                email,
                contactNumber,
                companyName,
                companySize,
                howWeCanHelp
            }
        });

        res.status(200).json({
            message: `successfully ${getInTouch.firstName}'s Get in Touch Data Recorded!!`,
            fullName: `${firstName} ${lastName}`,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
}