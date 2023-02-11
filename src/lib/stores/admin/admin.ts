import type { IDrawerContent,IChangeDetailSiswa } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

const changeDetailSiswaWritable: Writable<IChangeDetailSiswa> = writable();

const drawerContentWritable: Writable<IDrawerContent> = writable({
	value: 'Jadwal'
});

export { drawerContentWritable, changeDetailSiswaWritable };
export type { IDrawerContent };
