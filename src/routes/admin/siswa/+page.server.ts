import type { Actions, PageServerLoad } from './$types';

import { addUser } from '$lib/server/addUser';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		return await addUser(event, 'Siswa', false);
	}
};
