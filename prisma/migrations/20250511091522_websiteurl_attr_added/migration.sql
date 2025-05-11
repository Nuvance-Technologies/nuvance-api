/*
  Warnings:

  - Added the required column `websiteUrl` to the `PortfolioProjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PortfolioProjects" ADD COLUMN     "websiteUrl" TEXT NOT NULL;
