import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (cookies.get('username')) {
		const getJadwalSiswa = async () =>
			await prisma.siswa.findUnique({
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
							// keteranganMasuk: true,
							guru: true
						}
					},
					jenisKelamin: true,
					tempat : true,
					tanggalLahir :true,
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
