-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('User', 'Admin', 'CourtOwner');

-- CreateTable
CREATE TABLE "public"."Account" (
    "Id" SERIAL NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT,
    "DisplayName" TEXT,
    "Role" "public"."Role" NOT NULL DEFAULT 'User',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "Id" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."CourtOwner" (
    "Id" INTEGER NOT NULL,

    CONSTRAINT "CourtOwner_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."Court" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "OwnerId" INTEGER NOT NULL,

    CONSTRAINT "Court_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_UserName_key" ON "public"."Account"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "Account_Email_key" ON "public"."Account"("Email");

-- AddForeignKey
ALTER TABLE "public"."Admin" ADD CONSTRAINT "Admin_Id_fkey" FOREIGN KEY ("Id") REFERENCES "public"."Account"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourtOwner" ADD CONSTRAINT "CourtOwner_Id_fkey" FOREIGN KEY ("Id") REFERENCES "public"."Account"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Court" ADD CONSTRAINT "Court_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "public"."CourtOwner"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
