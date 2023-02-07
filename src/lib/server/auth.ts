
import { redirect, type RequestEvent } from '@sveltejs/kit';

export const authenticateUser = async (event: RequestEvent) => {
	const { cookies, } = event;

	const role = cookies.get('role');

	// console.log({ user: user });

	const cekLogin = (v: string | undefined) => {
		if (role !== v) {
			throw redirect(303, '/');
		}
	};

	if (event.url.pathname.startsWith('/admin')) {
		cekLogin('Admin');
	} else if (event.url.pathname.startsWith('/guru')) {
		cekLogin('Guru');
	} else if (event.url.pathname.startsWith('/siswa')) {
		cekLogin('Siswa');
	}


};


export const cekUser = (role: string | undefined) => {
	if (role === 'Admin') {
		throw redirect(303, '/admin');
	} else if (role === 'Guru') {
		throw redirect(303, '/guru');
	} else if (role === 'Siswa') {
		throw redirect(303, '/siswa');
	}
};
