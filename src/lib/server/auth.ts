// import { RoleUser } from '@prisma/client';
import { RoleUser } from '@prisma/client';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { prisma } from './prisma';

export const authenticateUser = async (event: RequestEvent) => {
	const { cookies } = event;

	const userToken = cookies.get('auth');
	const user = await getUser(userToken);

	console.log({ role : user?.role });

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

const getUser = async (idToken: string | undefined) => {
	if (idToken !== undefined) {
		// console.log(idToken);

		const user = await prisma.user.findFirst({
			where: {
				id: Number(idToken)
			}
		});

		return user;
	}
	return null;
};
