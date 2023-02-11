import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (cookies.get('username')) {
		const getGuru = async () => await prisma.guru.findMany({});
		const getSiswa = async () => await prisma.siswa.findMany({});
		const getJadwal = async () =>
			await prisma.jadwal.findMany({
				select: {
					id: true,
					ruangan: true,
					waktu: true,
					keteranganMasuk: true,
					kategoriKursus: true,
					guru: true,
					siswa: true
				}
			});

		return {
			guru: getGuru(),
			siswa: getSiswa(),
			jadwal: getJadwal()
		};
	}
}) satisfies PageServerLoad;
