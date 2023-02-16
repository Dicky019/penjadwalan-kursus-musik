<script lang="ts">
	import { FormJadwal } from '$lib/components';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';
	import type { PageData } from './$types';

	export let data: PageData;

	const { listGuru,listSiswa ,jadwal } = data;

	listSiswa?.sort((a, b) => {
		if (a.id > b.id) {
			return 1;
		}

		if (a.id < b.id) {
			return -1;
		}

		return 0;
	});
	listGuru?.sort((a, b) => {
		if (a.id > b.id) {
			return 1;
		}

		if (a.id < b.id) {
			return -1;
		}

		return 0;
	});

	export let form: ActionData;

	if (form !== null) {
		if (form?.error) {
			toast.error(`${form?.message}`);
			form = null;
		} else {
			toast.success(`Berhasil Di Update ${form.message}`);
			form = null;
		}
	}
</script>

<FormJadwal {jadwal} isUpdate={true} {listGuru} {listSiswa} />
