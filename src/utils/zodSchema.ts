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
    EstimatedBudget: z.string().optional(),
    timeline: z.enum(["lessThanOneMonth", "oneToThreeMonths", "threeToSixMonths", "moreThanSixMonths", "flexible"]),
    contactMethod: z.enum(["email", "phoneCall", "videoCall", "whatsapp"]),
    additionalInfo: z.string().optional()
})

export const portfolioValidationSchema = z.object({
    title: z.string(),
    description: z.string(),
    testimonial: z.string().optional(),
    videoUrl: z.string(),
    websiteUrl: z.string(),
})

export const contactValidationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    contactNumber: z.string().min(10).max(10),
    companyName: z.string().optional(),
    companySize: z.string().optional(),
    howWeCanHelp: z.string(),
})