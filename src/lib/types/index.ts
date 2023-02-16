import type { Ruangan, KategoriKursus, Guru, Siswa } from '@prisma/client';

interface IDrawerContent {
	value: 'Jadwal' | 'Guru' | 'Siswa';
}

interface IFilterJadwalKosong {
	ruangan: string;
	hari: string;
	jam: string;
}

interface IJadwal {
	id: number;
	ruangan: Ruangan;
	hari: string;
	jam: string;
	ruanganPenganti: Ruangan | null;
	hariPenganti: string | null;
	jamPenganti: string | null;
	// keteranganMasuk: boolean;
	kategoriKursus: KategoriKursus;
	guru: Guru;
	siswa: Siswa[];
}

interface IChangeDetailSiswa {
	listSiswa: Siswa[];
	guru: Guru;
	hari: string;
	jam: string;
	ruangan: string;
}

interface IFormJadwalGuru {
	guru: Guru;
	isSelect: boolean;
}

interface IFormJadwalSiswa {
	siswa: Siswa;
	isSelect: boolean;
}

interface IDeleteWithId {
	delete: string;
	value: number;
}

export type {
	IDrawerContent,
	IJadwal,
	IChangeDetailSiswa,
	IFormJadwalGuru,
	IFormJadwalSiswa,
	IDeleteWithId,
	IFilterJadwalKosong
};
