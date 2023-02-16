import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import type { IDeleteWithId } from '$lib/types';

export const load = (async ({ cookies }) => {
	if (cookies.get('username')) {
		const getGuru = async () => await prisma.guru.findMany({});
		const getSiswa = async () => await prisma.siswa.findMany({});
		const getJadwal = async () =>
			await prisma.jadwal.findMany({
				select: {
					id: true,
					ruangan: true,
					hari: true,
					jam: true,
					ruanganPenganti :true,
					hariPenganti    :true,
					jamPenganti     :true,
					// keteranganMasuk: true,
					kategoriKursus: true,
					guru: true,
					siswa: true
				},
				orderBy : {
					id : "asc",

				}
			});

		return {
			guru: getGuru(),
			siswa: getSiswa(),
			jadwal: getJadwal()
		};
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		let drawerContent = 'Jadwal';
		try {
			const { id } = Object.fromEntries(await request.formData());

			const value = id.toString().split('::');

			const deleteW: IDeleteWithId = {
				delete: value[1],
				value: Number(value[0])
			};

			let result = '';

			console.log(deleteW);

			if (deleteW.delete === 'Jadwal') {
				const jadwal = await prisma.jadwal.delete({
					where: {
						id: deleteW.value
					}
				});

				result = `Ruangan ${jadwal.ruangan} waktu ${jadwal.hari}, ${jadwal.jam} `;
				drawerContent = 'Jadwal';
			} else if (deleteW.delete === 'Guru') {
				const deleteguru = prisma.guru.delete({
					where: {
						id: deleteW.value
					}
				});

				const deleteJadwals = prisma.jadwal.deleteMany({
					where: {
						guruId: deleteW.value
					}
				});

				const transaction = await prisma.$transaction([deleteJadwals, deleteguru]);

				result = `Guru ${transaction[1].username}`;
				drawerContent = 'Guru';
			} else if (deleteW.delete === 'Siswa') {
				const deleteSiswa = await prisma.siswa.delete({
					where: {
						id: deleteW.value
					}
				});

				result = `Siswa ${deleteSiswa.username}`;
				drawerContent = 'Siswa';
			}
			return {
				error: false,
				message: result,
				drawer : drawerContent
			};
		} catch (error) {
			console.log({ error });

			return {
				error: true,
				message: 'Ada yang Salah',
				drawer : drawerContent
			};
		}
	}
};
