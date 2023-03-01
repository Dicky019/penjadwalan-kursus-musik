import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

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


export const actions: Actions = {
	async default({ request }) {
		try {
			console.log('tess');
			const { id } = Object.fromEntries(await request.formData());

			const jadwalPenganti = await prisma.jadwal.update({
				where: {
					id: Number(id.toString())
				},
				data: {
					jamPenganti: null,
					hariPenganti: null,
					ruanganPenganti: null
				}
			});

            // redirect(301,"/guru")

			return {
				error: false,
				message: `Jadwal Penganti ${jadwalPenganti.ruangan}`
			};

            
		} catch (e) {
			return {
				error: true,
				message: 'Ada Yang Salah'
			};
		}
	}
};

