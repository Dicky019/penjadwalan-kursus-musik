import { prisma } from '$lib/server/prisma';
import type { IJadwal } from '$lib/types';
import type { KategoriKursus, Ruangan } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies, params }) => {
	if (cookies.get('username')) {
		const getJadwal: () => Promise<IJadwal | null> = async () =>
			await prisma.jadwal.findUnique({
				select: {
					id: true,
					ruangan: true,
					hari: true,
					jam: true,
					// keteranganMasuk: true,
					kategoriKursus: true,
					guru: true,
					siswa: true,
					jamPenganti: true,
					hariPenganti: true,
					ruanganPenganti: true
				},
				where: {
					id: Number(params.id)
				}
			});

		const getGuru = async () => await prisma.guru.findMany({});

		const getSiswa = async () => await prisma.siswa.findMany({});

		return {
			jadwal: getJadwal(),
			listGuru: getGuru(),
			listSiswa: getSiswa()
		};
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, params }) => {
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

			const jadwal = await prisma.jadwal.update({
				where: {
					id: Number(params.id)
				},
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
	}
};
