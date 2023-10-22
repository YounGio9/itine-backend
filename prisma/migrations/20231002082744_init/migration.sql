/*
  Warnings:

  - You are about to drop the column `pnoneNumber` on the `Deliverer` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Deliverer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deliverer" DROP COLUMN "pnoneNumber",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
