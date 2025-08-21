/*
  Warnings:

  - You are about to drop the column `OwnerId` on the `Court` table. All the data in the column will be lost.
  - Added the required column `GroupId` to the `Court` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Price` to the `Court` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Court" DROP CONSTRAINT "Court_OwnerId_fkey";

-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "DisabledAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Court" DROP COLUMN "OwnerId",
ADD COLUMN     "DisabledAt" TIMESTAMP(3),
ADD COLUMN     "GroupId" INTEGER NOT NULL,
ADD COLUMN     "Price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."CourtOwner" ADD COLUMN     "DisabledAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."CourtGroup" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "OwnerId" INTEGER NOT NULL,
    "Address" TEXT NOT NULL,
    "DisabledAt" TIMESTAMP(3),

    CONSTRAINT "CourtGroup_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."CourtBooking" (
    "Id" SERIAL NOT NULL,
    "RecordDate" TIMESTAMP(3) NOT NULL,
    "BookStartTime" TIMESTAMP(3) NOT NULL,
    "BookEndTime" TIMESTAMP(3) NOT NULL,
    "PaymentStatus" BOOLEAN NOT NULL,
    "CourtId" INTEGER NOT NULL,
    "AccountId" INTEGER NOT NULL,
    "DisabledAt" TIMESTAMP(3),

    CONSTRAINT "CourtBooking_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "public"."Court" ADD CONSTRAINT "Court_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "public"."CourtGroup"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourtGroup" ADD CONSTRAINT "CourtGroup_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "public"."CourtOwner"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourtBooking" ADD CONSTRAINT "CourtBooking_CourtId_fkey" FOREIGN KEY ("CourtId") REFERENCES "public"."Court"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourtBooking" ADD CONSTRAINT "CourtBooking_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "public"."Account"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
