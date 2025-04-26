import { Request, Response } from "express";
import { signinValidationSchema, signupValidationSchema } from "../utils/zodSchema";
import prisma from "../db/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_ADMIN_SECRET } from "../config";

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

        // Checking if Admin already exists:

        const existingAdmin = await prisma.admin.findUnique({
            where: {
                email: email
            }
        });

        if (existingAdmin) {
            res.status(400).json({
                message: "Admin already exists, Try with a Different EMAIL!!"
            });
            return;
        }

        // Hashing the password:

        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating the Admin:

        const ADMIN = await prisma.admin.create({
            data: {
                adminname,
                email,
                password: hashedPassword,
            }
        });

        res.status(200).json({
            message: `${ADMIN.adminname} successfully signed up!!`,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const result = signinValidationSchema.safeParse(req.body);

        // If validation fails, return an error
        if (!result.success) {
            res.status(400).json({
                message: "Validation error",
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const { email, password } = result.data;

        // Find the admin in the database
        const admin = await prisma.admin.findUnique({
            where: {
                email
            },
        });

        if (!admin) {
            res.status(400).json({
                message: "Admin Not Found"
            });
            return;
        }

        // Compare password with hashed password in DB
        const matchPassword = await bcrypt.compare(password, admin.password);
        if (!matchPassword) {
            res.status(401).json({
                message: "Incorrect Password!"
            });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email
            },
            JWT_ADMIN_SECRET,
            {
                expiresIn: "4d" // Token expires in 4 day
            }
        );

        // Set the JWT token as an HTTP-only cookie

        res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development", // Secure in production
                sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", // Allow cross-site cookies
                maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
                path: "/"
            })
            .json({
                success: true,
                message: "Admin Logged In Successfully!",
                admin: {
                    id: admin.id,
                    email: admin.email
                }
            });

        return;
    } catch (error) {
        console.error("Signin Error:", error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(200).json({
            message: "Admin Logged Out Successfully!"
        });

        return;

    } catch (error) {

        console.error("Logout Error:", error);
        res.status(500).json({
            error: "Something went wrong while logging out."

        });

        return
    }
}