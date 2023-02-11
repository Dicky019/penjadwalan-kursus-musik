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
					Jadwal: {
						select: {
							ruangan: true,
							waktu: true,
							kategoriKursus: true,
							keteranganMasuk: true,
							siswa: true
						}
					},
					jenisKelamin: true,
					ttl: true,
					username: true
				}
			});

		return {
			guru: getGuru()
		};
	}
}) satisfies PageServerLoad;
