/*
  Warnings:

  - You are about to drop the column `PaymentId` on the `CourtBooking` table. All the data in the column will be lost.
  - Added the required column `BookedPrice` to the `CourtBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalPrice` to the `CourtBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Latitude` to the `CourtGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Longitude` to the `CourtGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('Pending', 'Confirmed', 'Cancelled', 'Completed');

-- AlterTable
ALTER TABLE "public"."Court" ADD COLUMN     "Capacity" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "Covered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "DurationUnit" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "IsIndoor" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."CourtBooking" DROP COLUMN "PaymentId",
ADD COLUMN     "BookedPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Status" "public"."BookingStatus" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "TotalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."CourtGroup" ADD COLUMN     "Description" TEXT,
ADD COLUMN     "Latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Longitude" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "public"."CourtPhoto" (
    "Id" SERIAL NOT NULL,
    "Url" TEXT NOT NULL,
    "CourtId" INTEGER NOT NULL,

    CONSTRAINT "CourtPhoto_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."CourtType" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "CourtType_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."CourtRating" (
    "Id" SERIAL NOT NULL,
    "Score" INTEGER NOT NULL,
    "Comment" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "CourtId" INTEGER NOT NULL,
    "AccountId" INTEGER NOT NULL,

    CONSTRAINT "CourtRating_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."Service" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."CourtGroupService" (
    "Id" SERIAL NOT NULL,
    "GroupId" INTEGER NOT NULL,
    "ServiceId" INTEGER NOT NULL,
    "Price" DOUBLE PRECISION,
    "IsAvailable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CourtGroupService_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."_CourtToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourtToType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourtRating_CourtId_AccountId_key" ON "public"."CourtRating"("CourtId", "AccountId");

-- CreateIndex
CREATE UNIQUE INDEX "CourtGroupService_GroupId_ServiceId_key" ON "public"."CourtGroupService"("GroupId", "ServiceId");

-- CreateIndex
CREATE INDEX "_CourtToType_B_index" ON "public"."_CourtToType"("B");

-- AddForeignKey
ALTER TABLE "public"."CourtPhoto" ADD CONSTRAINT "CourtPhoto_CourtId_fkey" FOREIGN KEY ("CourtId") REFERENCES "public"."Court"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourtRating" ADD CONSTRAINT "CourtRating_CourtId_fkey" FOREIGN KEY ("CourtId") REFERENCES "public"."Court"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourtRating" ADD CONSTRAINT "CourtRating_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "public"."Account"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourtGroupService" ADD CONSTRAINT "CourtGroupService_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "public"."CourtGroup"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourtGroupService" ADD CONSTRAINT "CourtGroupService_ServiceId_fkey" FOREIGN KEY ("ServiceId") REFERENCES "public"."Service"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CourtToType" ADD CONSTRAINT "_CourtToType_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Court"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CourtToType" ADD CONSTRAINT "_CourtToType_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."CourtType"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
