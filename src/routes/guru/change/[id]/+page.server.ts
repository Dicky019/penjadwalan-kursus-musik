import type { IFilterJadwalKosong, IJadwal } from '$lib/types';
import type { Ruangan } from '@prisma/client';
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

		const getJadwals: () => Promise<IJadwal[] | null> = async () =>
			await prisma.jadwal.findMany({
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
				}
				// where: {
				// 	id: Number(params.id)
				// }
			});

		return {
			jadwal: getJadwal(),
			jadwals: getJadwals()
		};
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, params }) => {
		try {
			const { jadwalkosong } = Object.fromEntries(await request.formData());

			console.log({ jadwalkosong });

			const jadwal = JSON.parse(jadwalkosong.toString()) as IFilterJadwalKosong

			const jadwalPenganti = await prisma.jadwal.update({
				where: {
					id: Number(params.id)
				},
				data: {
					jamPenganti: jadwal.jam,
					hariPenganti: jadwal.hari.toString(),
					ruanganPenganti: jadwal.ruangan.toString() as Ruangan
				}
			});

			return {
				error: false,
				message: `Ruangan ${jadwalPenganti.ruanganPenganti} waktu ${jadwalPenganti.hariPenganti}, ${jadwalPenganti.jamPenganti} `
			};
		} catch (e) {
			return {
				error: true,
				message: 'Ada Yang Salah'
			};
		}
	}
};
