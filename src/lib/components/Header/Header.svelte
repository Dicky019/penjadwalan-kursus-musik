<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Logout from 'iconsax-svelte/Logout.svelte';

	export let data = {
		url: '/',
		name: 'Siswa'
	};

	export let hiddenUrl = true;
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		{#if hiddenUrl}
			<a href={data.url} class="btn btn-ghost normal-case text-xl">{data.name}</a>
		{:else}
			<label for="my-drawer-2" class="lg:hidden btn btn-ghost normal-case text-xl">{data.name}</label>
		{/if}
	</div>

	<form
		class=""
		action="/logout"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				invalidateAll();
				await applyAction(result);
			};
		}}
	>
		<div class="tooltip tooltip-left" data-tip="Logout">
			<button type="submit" class="btn btn-circle btn-outline"> <Logout variant="Linear" /></button>
		</div>
	</form>
</div>
