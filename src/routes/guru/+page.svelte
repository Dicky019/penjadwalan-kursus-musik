<script lang="ts">
	import type { PageData } from './$types';
	import type { ActionData } from './$types';
	import { Header, Jadwal } from '$lib/components';
	import type { IJadwal } from '$lib/types';
	import toast from 'svelte-french-toast';

	export let data: PageData;

	const getHari = (hari: string) => {
		switch (hari) {
			case 'Senin':
				return 1;
			case 'Selasa':
				return 2;
			case 'Rabu':
				return 3;
			case 'Kamis':
				return 4;
			case 'Sabtu':
				return 5;
			default:
				return 1;
		}
	};

	let jadwal: IJadwal[] = data?.guru?.jadwal ?? [];
	jadwal = jadwal.sort((a, b) => {
		const n1 = getHari(a.hari);
		const n2 = getHari(b.hari);
		return n1 - n2;
	});

	export let form: ActionData;

	if (form !== null) {
		if (form?.error) {
			toast.error(`${form?.message}`);
			form = null;
		} else {
			toast.success(`Berhasil Menghapus ${form.message}`);
			form = null;
		}
	}
</script>

<svelte:head>
	<title>Guru | {data.guru?.username}</title>
</svelte:head>

<Header
	data={{
		url: '/guru',
		name: 'Guru'
	}}
/>

<Jadwal isGuru={true} {jadwal} />
