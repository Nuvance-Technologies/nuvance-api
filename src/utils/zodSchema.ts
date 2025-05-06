import { z } from "zod";

export const signupValidationSchema = z.object({
    adminname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export const signinValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const getInTouchValidationSchema = z.object({
    fullname: z.string(),
    companyName: z.string(),
    email: z.string().email(),
    contactNumber: z.string(),
    projectType: z.enum(["WebsiteDevelopment", "MobileAppDevelopment", "UIUXDesign", "ContentWriting", "Other"]),
    projectDescription: z.string(),
    EstimatedBudget: z.string(),
    timeline: z.enum(["lessThanOneMonth", "oneToThreeMonths", "threeToSixMonths", "moreThanSixMonths", "flexible"]),
    contactMethod: z.enum(["email", "phoneCall", "videoCall", "whatsapp"]),
    additionalInfo: z.string().optional()
})
