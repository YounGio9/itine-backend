/*
  Warnings:

  - Changed the type of `maritalStatus` on the `DeliveryMan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MaritalStatusType" AS ENUM ('single', 'married');

-- AlterTable
ALTER TABLE "DeliveryMan" DROP COLUMN "maritalStatus",
ADD COLUMN     "maritalStatus" "MaritalStatusType" NOT NULL;
