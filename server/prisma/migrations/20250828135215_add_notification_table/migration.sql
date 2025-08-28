-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('Confirmation', 'Cancellation', 'Modification');

-- CreateTable
CREATE TABLE "public"."Notification" (
    "Id" SERIAL NOT NULL,
    "Message" TEXT NOT NULL,
    "Type" "public"."NotificationType" NOT NULL,
    "AccountId" INTEGER NOT NULL,
    "BookingId" INTEGER,
    "DisabledAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "public"."Account"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_BookingId_fkey" FOREIGN KEY ("BookingId") REFERENCES "public"."CourtBooking"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
