<script lang="ts">
	import { Header } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Guru</title>
</svelte:head>

<Header
	data={{
		url: '/guru',
		name: 'Guru'
	}}
/>

<h1>Guru</h1>
