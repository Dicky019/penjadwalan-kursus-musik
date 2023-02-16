import { cekUser } from '$lib/server/auth';
import type { PageServerLoad } from './$types';
// import { prisma } from '$lib/server/prisma';

export const load = (async ({ cookies }) => {
	const role = cookies.get('role');
	// await prisma.admin.create({
	// 	data: {
	// 		username: 'admin aja',
	// 		password: '123456'
	// 	}
	// });
	return cekUser(role);
}) satisfies PageServerLoad;
