import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	//    const user =  await prisma.user.findMany()
	//    console.log({user});
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { email, password, remember } = Object.fromEntries(await request.formData());

		console.log({ email, password , remember});

		// cookies.set('', '', {
		// 	path: '/',
		// 	httpOnly: true,
		// 	sameSite: 'strict',
		// 	secure: process.env.NODE_ENV === 'production',
		// 	maxAge: 60 * 60 * 24 * 7
		// });

		return;
	}
};
