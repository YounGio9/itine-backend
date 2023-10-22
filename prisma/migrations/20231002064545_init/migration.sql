-- CreateTable
CREATE TABLE "Deliverer" (
    "id" SERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pnoneNumber" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Deliverer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deliverer_email_key" ON "Deliverer"("email");
