// import { RoleUser } from '@prisma/client';
import { JenisKelamin, RoleUser, type User } from '@prisma/client';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { prisma } from './prisma';

export const authenticateUser = async (event: RequestEvent) => {
	const { cookies, locals } = event;

	// await prisma.user.create({
	// 	data: {
	// 		username: 'Harlen',
	// 		password: '123456',
	// 		role: RoleUser.Guru
	// 	}
	// });

	// await prisma.guru.create({
	// 	data: {
	// 		userId: 1,
	// 		fullName: 'Harlen Timang',
	// 		alamat: 'hdhd',
	// 		jenisKelamin: JenisKelamin.LakiLaki,
			
	// 	}
	// });

	const emailToken = cookies.get('auth');
	const user = (await getUser(emailToken)) || locals.user;

	console.log({ role: user?.role });

	if (event.url.pathname.startsWith('/admin')) {
		if (user?.role != RoleUser.Admin) {
			throw redirect(303, '/');
		}
	} else if (event.url.pathname.startsWith('/guru')) {
		if (user?.role != RoleUser.Guru) {
			throw redirect(303, '/');
		}
	} else if (event.url.pathname.startsWith('/siswa')) {
		if (user?.role != RoleUser.Siswa) {
			throw redirect(303, '/');
		}
	}

	return user;
};

const getUser = async (username: string | undefined) => {
	if (username !== undefined) {
		// console.log(idToken);

		const user = await prisma.user.findUnique({
			where: {
				username: username
			}
		});

		return user;
	}
	return null;
};

export const cekUser = (user: User | null) => {
	if (user?.role === RoleUser.Admin) {
		throw redirect(303, '/admin');
	} else if (user?.role === RoleUser.Guru) {
		throw redirect(303, '/guru');
	} else if (user?.role === RoleUser.Siswa) {
		throw redirect(303, '/siswa');
	}
};
