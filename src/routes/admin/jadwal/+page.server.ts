import { prisma } from '$lib/server/prisma';
import type { KategoriKursus, Ruangan } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (cookies.get('username')) {
		const getGuru = async () => await prisma.guru.findMany({});
		const getSiswa = async () => await prisma.siswa.findMany({});
		return {
			listGuru: getGuru(),
			listSiswa: getSiswa()
		};
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const { kategoriKursus, ruangan, jam, hari, guru, listSiswa } = Object.fromEntries(
				await request.formData()
			);

			const listValueSiswa = listSiswa
				.toString()
				.split(', ')
				.map((v) => {
					return {
						username: v
					};
				});

			console.log({listValueSiswa});

			const jadwal = await prisma.jadwal.create({
				data: {
					kategoriKursus: kategoriKursus.toString() as KategoriKursus,
					hari: hari.toString(),
					jam: jam.toString(),
					ruangan: ruangan.toString() as Ruangan,
					siswa: {
						connect: listValueSiswa
					},
					// keteranganMasuk: false,
					guru: {
						connect: {
							username: guru.toString()
						}
					}
				}
			});
			console.log(jadwal);

			return {
				error: false,
				message: `Ruangan ${jadwal.ruangan} waktu ${jadwal.hari}, ${jadwal.jam} `
			};
		} catch (e) {
			return {
				error: true,
				message: 'Ada Yang Salah'
			};
		}
		// console.log(await request.formData());
	}
};
