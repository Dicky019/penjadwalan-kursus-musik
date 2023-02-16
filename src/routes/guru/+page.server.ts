import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (cookies.get('username')) {
		const getGuru = async () =>
			await prisma.guru.findUnique({
				where: {
					username: cookies.get('username')
				},
				select: {
					alamat: true,
					fullName: true,
					jadwal: {
						select: {
							ruangan: true,
							hari: true,
							jam: true,
							kategoriKursus: true,
							ruanganPenganti :true,
							hariPenganti    :true,
							jamPenganti     :true,
							// keteranganMasuk: true,
							guru : true,
							id: true,
							siswa: true
						}
					},
					jenisKelamin: true,
					tempat: true,
					tanggalLahir: true,
					username: true
				}
			});

			// id: number;
			// ruangan: Ruangan;
			// hari: string;
			// jam: string;
			// // keteranganMasuk: boolean;
			// kategoriKursus: KategoriKursus;
			// guru: Guru;
			// siswa: Siswa[];

		return {
			guru: getGuru()
		};
	}
}) satisfies PageServerLoad;
