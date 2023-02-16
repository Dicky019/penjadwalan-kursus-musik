<script lang="ts">
	import type { PageData } from './$types';
	import { Header, Jadwal } from '$lib/components';
	import type { IJadwal } from '$lib/types';

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

	const jadwal: IJadwal[] = (data?.guru?.jadwal ?? []).sort((a, b) => {
		const n1 = getHari(a.hari);
		const n2 = getHari(b.hari);
		return n1 - n2;
	});
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
