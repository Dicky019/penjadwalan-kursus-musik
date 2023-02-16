<script lang="ts">
	import EmptySvg from '$lib/images/empty.svg';
	export let empty = 'Kosong';
	export let href = '';
	export let isAdmin = true;
</script>

<div class="flex flex-col items-center">
	<div class="text-2xl font-semibold my-14 divider">{empty}</div>
	<img class="object-cover w-96" src={EmptySvg} alt="empty" />

	{#if isAdmin}
		<a {href} class="btn my-10">Create</a>
		<div class="text-2xl font-semibold divider">{empty}</div>
	{/if}
</div>
