/*
  Warnings:

  - Added the required column `code` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "code" TEXT NOT NULL;
