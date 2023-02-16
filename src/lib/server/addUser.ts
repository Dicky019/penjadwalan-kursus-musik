import type { JenisKelamin } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';
import { prisma } from './prisma';

export const addUser = async (event: RequestEvent, user: 'Guru' | 'Siswa', isUpdate: boolean) => {
	const { request, params } = event;

	try {
		const { fullName, userName, alamat, jenisKelamin, tempat, tanggalLahir, password } =
			Object.fromEntries(await request.formData());

		const findUniq = {
			where: {
				username: userName.toString()
			}
		};

		const date = new Date(tanggalLahir.toString());

		console.log({ date });

		const data = {
			fullName: fullName.toString(),
			username: userName.toString(),
			alamat: alamat.toString(),
			jenisKelamin: jenisKelamin.toString() as JenisKelamin,
			tempat: tempat.toString(),
			password: password.toString(),
			tanggalLahir: date
		};

		if (user === 'Guru') {
			if (isUpdate) {
				const guru = await prisma.guru.update({
					data,
					where: {
						id: Number(params.id?.toString())
					}
				});
				return {
					error: false,
					message: guru.username
				};
			}

			const sameUserName = await prisma.guru.findUnique(findUniq);

			if (sameUserName !== null) {
				return {
					error: true,
					message: 'User Name Sama'
				};
			}

			const guru = await prisma.guru.create({ data });
			return {
				error: false,
				message: guru.username
			};
		} else if (user === 'Siswa') {
			if (isUpdate) {
				const siswa = await prisma.siswa.update({
					data,
					where: {
						id: Number(params.id?.toString())
					}
				});
				return {
					error: false,
					message: siswa.username
				};
			}

			const sameUserName = await prisma.siswa.findUnique(findUniq);

			if (sameUserName !== null) {
				return {
					error: true,
					message: 'User Name Sama'
				};
			}

			const siswa = await prisma.siswa.create({ data });
			return {
				error: false,
				message: siswa.username
			};
		}
	} catch (error) {
		console.log({ error });

		return {
			error: true,
			message: 'Ada Yang Salah'
		};
	}
};
