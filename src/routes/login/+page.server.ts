import { cekUser } from '$lib/server/auth';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;

	return cekUser(user);
};

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const { email, password, remember } = Object.fromEntries(await request.formData());

		console.log({ email, password, remember });

		const user = await prisma.user.findUnique({
			where: {
				email: email.toString()
			}
		});
		if (!user) {
			throw error(404, 'User not registered');
		}
		const checkPassword = user.password === password;
		if (!checkPassword) {
			throw error(401, 'Email address or password not valid');
		} else if (remember === 'on') {
			cookies.set('auth', user.email, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});
		}

		return { username: locals.user?.fullname };
	}
};
