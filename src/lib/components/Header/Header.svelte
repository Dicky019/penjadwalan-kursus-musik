<script>
	import Logout from 'iconsax-svelte/Logout.svelte';

	export let data = {
		url: '/',
		name: 'Siswa'
	};
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href={data.url} class="btn btn-ghost normal-case text-xl">{data.name}</a>
	</div>
	<div class="tooltip tooltip-left" data-tip="Logout">
		<a href="/login" class="btn btn-circle btn-outline"> <Logout variant="Linear" /></a>
	</div>
</div>

<!-- Button -->
<!-- <div class="flex-none">
		svelte-ignore a11y-no-noninteractive-tabindex 
		<div tabindex=0 class="dropdown dropdown-end">
			 svelte-ignore a11y-no-noninteractive-tabindex 
			<label for="" tabindex=0 class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src="/favicon.png" alt="kosong" />
				</div>
			</label>
			<ul class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
				<li>
					<a href="/" class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a href="/">Settings</a></li>
				<li><a href="/">Logout</a></li>
			</ul>
		</div>
	</div> -->
