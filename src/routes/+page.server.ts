import { cekUser } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;

	return cekUser(user);
}) satisfies PageServerLoad;
