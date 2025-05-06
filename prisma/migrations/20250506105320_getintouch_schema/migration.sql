-- CreateEnum
CREATE TYPE "projectType" AS ENUM ('WebsiteDevelopment', 'MobileAppDevelopment', 'UIUXDesign', 'ContentWriting', 'Other');

-- CreateEnum
CREATE TYPE "timeline" AS ENUM ('lessThanOneMonth', 'oneToThreeMonths', 'threeToSixMonths', 'moreThanSixMonths', 'flexible');

-- CreateEnum
CREATE TYPE "contactMethod" AS ENUM ('email', 'phoneCall', 'videoCall', 'whatsapp');

-- CreateTable
CREATE TABLE "GetInTouchResponse" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "companyName" TEXT,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "projectType" "projectType" NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "EstimatedBudget" TEXT,
    "timeline" "timeline",
    "contactMethod" "contactMethod",
    "additionalInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GetInTouchResponse_pkey" PRIMARY KEY ("id")
);
