-- CreateEnum
CREATE TYPE "holiday_category" AS ENUM ('NATIONAL', 'STATE', 'CITY');

-- CreateTable
CREATE TABLE "holidays" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "holiday_category" NOT NULL,
    "categoryColor" TEXT NOT NULL,
    "state" TEXT,

    CONSTRAINT "holidays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
