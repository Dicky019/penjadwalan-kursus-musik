import { cekUser } from '$lib/server/auth';
import { prisma } from '$lib/server/prisma';
import type { Admin, Guru, Siswa } from '@prisma/client';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const role = cookies.get('role');

	return cekUser(role);
};

export const actions: Actions = {
	default: async ({ request, cookies, }) => {
		const { username, password, role, remember } = Object.fromEntries(await request.formData());

		console.log({ username, password, role, remember });

		let user: Admin | Guru | Siswa | null = null;

		function setCookies(role: string,username:string) {
			cookies.set('role', role, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});
			cookies.set('username', username, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});
		}

		if (role === 'Admin') {
			user = await prisma.admin.findUnique({
				where: {
					username: username.toString()
				}
			});
			if (!user) {
				throw error(404, 'User not registered');
			}
			const checkPassword = user.password === password;
			if (!checkPassword) {
				throw error(401, 'Email address or password not valid');
			}
			setCookies('Admin',user.username);
		} else if (role === 'Guru') {
			user = await prisma.guru.findUnique({
				where: {
					username: username.toString()
				}
			});
			if (!user) {
				throw error(404, 'User not registered');
			}
			const checkPassword = user.password === password;
			if (!checkPassword) {
				throw error(401, 'Email address or password not valid');
			}
			setCookies('Guru',user.username);
		} else if (role === 'Siswa') {
			user = await prisma.siswa.findUnique({
				where: {
					username: username.toString()
				}
			});
			if (!user) {
				throw error(404, 'User not registered');
			}
			const checkPassword = user.password === password;
			if (!checkPassword) {
				throw error(401, 'Email address or password not valid');
			}
			setCookies('Siswa',user.username);
		}

		return { username: username };
	}
};
