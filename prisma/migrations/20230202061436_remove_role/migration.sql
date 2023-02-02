/*
  Warnings:

  - You are about to drop the column `userId` on the `Guru` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Siswa` table. All the data in the column will be lost.
  - You are about to drop the `RoleUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Guru` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Guru" DROP CONSTRAINT "Guru_userId_fkey";

-- DropForeignKey
ALTER TABLE "RoleUser" DROP CONSTRAINT "RoleUser_adminId_fkey";

-- DropForeignKey
ALTER TABLE "RoleUser" DROP CONSTRAINT "RoleUser_guruId_fkey";

-- DropForeignKey
ALTER TABLE "RoleUser" DROP CONSTRAINT "RoleUser_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "Siswa" DROP CONSTRAINT "Siswa_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleUserId_fkey";

-- DropIndex
DROP INDEX "Guru_fullName_key";

-- DropIndex
DROP INDEX "Siswa_fullName_key";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Guru" DROP COLUMN "userId",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Siswa" DROP COLUMN "userId",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "RoleUser";

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "Guru_username_key" ON "Guru"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_username_key" ON "Siswa"("username");
