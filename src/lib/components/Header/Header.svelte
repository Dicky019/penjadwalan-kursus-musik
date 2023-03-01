<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

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
			<label for="my-drawer-2" class="lg:hidden btn btn-ghost normal-case text-xl"
				>{data.name}</label
			>
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
			<button type="submit" class="btn btn-circle btn-error btn-outline"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
					/>
				</svg>
			</button>
		</div>
	</form>
</div>
