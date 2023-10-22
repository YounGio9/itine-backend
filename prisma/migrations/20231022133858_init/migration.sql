/*
  Warnings:

  - You are about to drop the `Deliverer` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DelivererStatusType" AS ENUM ('unset', 'accepted', 'rejected');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('INACTIVE', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- DropTable
DROP TABLE "Deliverer";

-- DropEnum
DROP TYPE "DelivererStatusType";

-- CreateTable
CREATE TABLE "Deliverer" (
    "id" SERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "maritalStatus" "MaritalStatusType" NOT NULL,
    "status" "DelivererStatusType" NOT NULL DEFAULT 'unset',
    "password" TEXT,

    CONSTRAINT "Deliverer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "deliveryFees" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "transactionReference" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "billedAt" TIMESTAMP(3) NOT NULL,
    "deliveredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "delivererId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deliverer_email_key" ON "Deliverer"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_delivererId_fkey" FOREIGN KEY ("delivererId") REFERENCES "Deliverer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
