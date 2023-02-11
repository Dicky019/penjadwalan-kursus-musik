import type { Ruangan, KategoriKursus, Guru, Siswa } from '@prisma/client';

interface IDrawerContent {
	value: 'Jadwal' | 'Guru' | 'Siswa';
}

interface IJadwal {
	id: number;
	ruangan: Ruangan;
	waktu: Date;
	keteranganMasuk: boolean;
	kategoriKursus: KategoriKursus;
	guru: Guru;
	siswa: Siswa[];
}

interface IChangeDetailSiswa {
    listSiswa : Siswa[],
    guru : Guru
}

export type { IDrawerContent, IJadwal,IChangeDetailSiswa };
