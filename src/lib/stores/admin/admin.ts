import type { IDrawerContent,IChangeDetailSiswa ,IDeleteWithId} from '$lib/types';
import { writable, type Writable } from 'svelte/store';

const changeDetailSiswaWritable: Writable<IChangeDetailSiswa> = writable();

const drawerContentWritable: Writable<IDrawerContent> = writable({
	value: 'Jadwal'
});

const deleteWithIdWritable : Writable<IDeleteWithId | undefined> = writable(undefined);

export { drawerContentWritable, changeDetailSiswaWritable,deleteWithIdWritable };

