-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('Admin', 'Guru', 'Siswa');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleUser" NOT NULL DEFAULT 'Siswa',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
