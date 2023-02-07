// See https://kit.svelte.dev/docs/types#app
// import { Siswa, Admin, Guru } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {
		// 	user: Admin | Guru | Siswa | null;
		// }
		// interface PageData {}
		// interface Platform {}
	}
}

export { prisma };
