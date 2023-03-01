import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	throw redirect(302, '/');
};

export const actions: Actions = {
	async default({ cookies }) {
		cookies.delete('username');
		cookies.delete('role');

		// redirect the user
		throw redirect(302, '/login');
	}
};
