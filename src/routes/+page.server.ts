import { cekUser } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const role = cookies.get('role');

	return cekUser(role);
}) satisfies PageServerLoad;
