import { prisma } from '$lib/server/prisma';
import type { Guru } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (cookies.get('username')) {
		const getSiswa = await prisma.siswa.findUniqueOrThrow({
			where: {
				username: cookies.get('username')
			},
			select: {
				alamat: true,
				fullName: true,
				Jadwal: true,
				jenisKelamin: true,
				ttl: true,
				password: true,
				username: true
			}
		});

		const feacthJadwalSiswa = async () => {
			const listJadwal: (Guru | null)[] = [];
			for (const item of getSiswa?.Jadwal ?? []) {
				const response = await prisma.guru.findUnique({
					where: {
						id: item.guruId
					}
				});
				listJadwal.push(response);
			}

			return listJadwal;
		};
		return {
			siswa: getSiswa,
			jadwal: feacthJadwalSiswa()
		};
	}

	return {
		siswa: null,
		jadwal: [] as (Guru | null)[]
	};
}) satisfies PageServerLoad;
