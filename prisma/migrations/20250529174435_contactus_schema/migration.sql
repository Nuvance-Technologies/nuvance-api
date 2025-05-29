-- CreateTable
CREATE TABLE "ContactUsResponse" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "companyName" TEXT,
    "companySize" TEXT,
    "howWeCanHelp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactUsResponse_pkey" PRIMARY KEY ("id")
);
