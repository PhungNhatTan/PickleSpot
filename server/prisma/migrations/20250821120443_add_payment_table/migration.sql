/*
  Warnings:

  - You are about to drop the column `PaymentStatus` on the `CourtBooking` table. All the data in the column will be lost.
  - Added the required column `PaymentId` to the `CourtBooking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('Cash', 'Card', 'BankTransfer', 'OnlineGateway');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('Pending', 'Completed', 'Failed', 'Refunded');

-- AlterTable
ALTER TABLE "public"."CourtBooking" DROP COLUMN "PaymentStatus",
ADD COLUMN     "PaymentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Payment" (
    "Id" SERIAL NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Currency" TEXT NOT NULL DEFAULT 'USD',
    "Method" "public"."PaymentMethod" NOT NULL,
    "Status" "public"."PaymentStatus" NOT NULL DEFAULT 'Pending',
    "PaidAt" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "BookingId" INTEGER NOT NULL,
    "AccountId" INTEGER NOT NULL,
    "DisabledAt" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_BookingId_fkey" FOREIGN KEY ("BookingId") REFERENCES "public"."CourtBooking"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "public"."Account"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
