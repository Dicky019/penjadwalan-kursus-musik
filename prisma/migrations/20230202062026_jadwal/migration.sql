/*
  Warnings:

  - You are about to drop the column `siswaId` on the `Jadwal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Jadwal" DROP CONSTRAINT "Jadwal_siswaId_fkey";

-- AlterTable
ALTER TABLE "Jadwal" DROP COLUMN "siswaId";

-- CreateTable
CREATE TABLE "_JadwalToSiswa" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JadwalToSiswa_AB_unique" ON "_JadwalToSiswa"("A", "B");

-- CreateIndex
CREATE INDEX "_JadwalToSiswa_B_index" ON "_JadwalToSiswa"("B");

-- AddForeignKey
ALTER TABLE "_JadwalToSiswa" ADD CONSTRAINT "_JadwalToSiswa_A_fkey" FOREIGN KEY ("A") REFERENCES "Jadwal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JadwalToSiswa" ADD CONSTRAINT "_JadwalToSiswa_B_fkey" FOREIGN KEY ("B") REFERENCES "Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
