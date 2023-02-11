import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (cookies.get('username')) {
		const getJadwalSiswa = async () =>
			await prisma.siswa.findUniqueOrThrow({
				where: {
					username: cookies.get('username')
				},
				select: {
					alamat: true,
					fullName: true,
					Jadwal: {
						select: {
							ruangan: true,
							waktu: true,
							kategoriKursus: true,
							keteranganMasuk: true,
							guru: true
						}
					},
					jenisKelamin: true,
					ttl: true,
					// password: true,
					username: true
				}
			});

		return {
			siswa: getJadwalSiswa()
		};
	}

	return {
		siswa: null
	};
}) satisfies PageServerLoad;
