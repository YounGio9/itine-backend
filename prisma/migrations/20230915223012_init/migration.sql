-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "senderMail" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" VARCHAR(255) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
