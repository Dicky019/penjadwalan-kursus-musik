<script lang="ts">
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import 'dayjs/locale/id';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { Header } from '$lib/components';
	import { User, Jadwal } from '$lib/components';
	import { drawerContentWritable, type IDrawerContent } from '$lib/stores';

	dayjs.locale('id');
	dayjs.extend(relativeTime);

	export let data: PageData;

	const guru = data.guru ?? [];
	const siswa = data.siswa ?? [];
	const jadwal = data.jadwal ?? [];

	let drawerContent: IDrawerContent;

	drawerContentWritable.subscribe((v) => {
		drawerContent = v;
	});
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<Header
	hiddenUrl={false}
	data={{
		url: '/admin',
		name: 'Admin'
	}}
/>

<!-- <label for="my-drawer-2" class="mx-4 btn btn-primary drawer-button ">Open drawer</label> -->

{#if drawerContent.value === 'Siswa'}
	<User user={siswa} title="Siswa" />
{:else if drawerContent.value === 'Guru'}
	<User user={guru} title="Guru" />
{:else}
	<Jadwal {jadwal} />
{/if}
