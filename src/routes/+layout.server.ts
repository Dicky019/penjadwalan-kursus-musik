import { authenticateUser } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	await authenticateUser(event);
}) satisfies LayoutServerLoad;
