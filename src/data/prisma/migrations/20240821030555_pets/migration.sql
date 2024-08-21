/*
  Warnings:

  - You are about to drop the column `activatedAt` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `activatedBy` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `activatorName` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `registeredAt` on table `Person` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_personId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_cardId_fkey";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "activatedAt",
DROP COLUMN "activatedBy",
DROP COLUMN "activatorName",
ALTER COLUMN "registeredAt" SET NOT NULL;

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
