import { Request, Response } from "express";
import { signupValidationSchema } from "../utils/zodSchema";
import prisma from "../db/prisma";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
    try {
        // Input Validation Via ZOD:

        const result = signupValidationSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const { adminname, email, password } = result.data;

        // Checking if user already exists:

        const existingUser = await prisma.admin.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            res.status(400).json({
                message: "Admin already exists, Try with a Different EMAIL!!"
            });
            return;
        }

        // Hashing the password:

        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating the User:

        const USER = await prisma.admin.create({
            data: {
                adminname,
                email,
                password: hashedPassword,
            }
        });

        res.status(200).json({
            message: `${USER.adminname} successfully signed up!!`,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
}