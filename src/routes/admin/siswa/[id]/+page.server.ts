import { addUser } from '$lib/server/addUser';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';


export const load = (async ({params}) => {
    const getSiswa = () => prisma.siswa.findUnique({
        where : {
            id: Number(params.id)
        }
    })

    return {
        user : getSiswa()
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
	default: async (event) => {
		return await addUser(event, 'Siswa', true);
	}
};
