-- CreateEnum
CREATE TYPE "Ruangan" AS ENUM ('Satu', 'Dua', 'Tiga');

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" SERIAL NOT NULL,
    "ruangan" "Ruangan" NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,
    "keteranganMasuk" BOOLEAN NOT NULL DEFAULT true,
    "guruId" INTEGER NOT NULL,
    "siswaId" INTEGER NOT NULL,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "Guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
