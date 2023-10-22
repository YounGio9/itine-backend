/*
  Warnings:

  - You are about to drop the column `active` on the `Deliverer` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "delivererStatusType" AS ENUM ('unset', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "Deliverer" DROP COLUMN "active",
ADD COLUMN     "password" TEXT,
ADD COLUMN     "status" "delivererStatusType" NOT NULL DEFAULT 'unset';
