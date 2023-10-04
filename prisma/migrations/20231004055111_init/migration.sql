/*
  Warnings:

  - You are about to drop the column `active` on the `DeliveryMan` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "deliveryManStatusType" AS ENUM ('unset', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "DeliveryMan" DROP COLUMN "active",
ADD COLUMN     "password" TEXT,
ADD COLUMN     "status" "deliveryManStatusType" NOT NULL DEFAULT 'unset';
