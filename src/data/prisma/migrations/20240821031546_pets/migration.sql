/*
  Warnings:

  - You are about to drop the column `category` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategoryId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "category",
DROP COLUMN "subcategory",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "subCategoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PetCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetSubCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetSubCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "PetSubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
