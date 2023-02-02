/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LakiLaki', 'Perempuan');

-- CreateEnum
CREATE TYPE "KategoriKursus" AS ENUM ('Keyboard', 'Drum', 'Gitar');

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleUser" NOT NULL DEFAULT 'Siswa',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "ttl" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guru" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "ttl" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Guru_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_fullName_key" ON "Siswa"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Guru_fullName_key" ON "Guru"("fullName");

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guru" ADD CONSTRAINT "Guru_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
