<script lang="ts">
	import { ButtonDrawerAdmin } from '$lib/components/';
	import type { ActionData, PageData } from './$types';
	import { Header } from '$lib/components';
	import { User, Jadwal } from '$lib/components';
	import { drawerContentWritable, deleteWithIdWritable } from '$lib/stores';
	import type { IDrawerContent } from '$lib/types';
	import toast from 'svelte-french-toast';
	import type { Ruangan } from '@prisma/client';

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

	const guru = (data.guru ?? []).sort((a, b) => {
		const n1 = a.username;
		const n2 = b.username;

		if (n1 > n2) {
			return 1;
		}

		if (n1 < n2) {
			return -1;
		}

		return 0;
	});

	const siswa = (data.siswa ?? []).sort((a, b) => {
		const n1 = a.username;
		const n2 = b.username;

		if (n1 > n2) {
			return 1;
		}

		if (n1 < n2) {
			return -1;
		}

		return 0;
	});

	const jadwal = (data.jadwal ?? []).sort((a, b) => {
		const n1 = getHari(a.hari);
		const n2 = getHari(b.hari);
		return n1 - n2;
	});

	let drawerContent: IDrawerContent;

	drawerContentWritable.subscribe((v) => {
		drawerContent = v;
	});

	let deleteId: number | undefined;
	let deleteW: string | undefined;

	deleteWithIdWritable.subscribe((v) => {
		deleteId = v?.value;
		deleteW = v?.delete;
	});

	export let form: ActionData;

	if (form !== null) {
		console.log(form);

		if (form?.error) {
			toast.error(`${form?.message}`);
			form = null;
		} else {
			toast.success(`Berhasil Di Hapus ${form.message}`);
			drawerContentWritable.set({
				value: ((form.drawer as 'Jadwal') || 'Guru' || 'Siswa') ?? 'Jadwal'
			});
			form = null;
		}
	}
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<!-- <label for="my-drawer-2" class="mx-4 btn btn-primary drawer-button ">Open drawer</label> -->

<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<Header
			hiddenUrl={false}
			data={{
				url: '/admin',
				name: 'Admin'
			}}
		/>
		{#if drawerContent.value === 'Siswa'}
			<User user={siswa} title="Siswa" />
		{:else if drawerContent.value === 'Guru'}
			<User user={guru} title="Guru" />
		{:else}
			<Jadwal {jadwal} />
		{/if}
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<ul class="menu w-full md:w-80 bg-base-100 text-base-content ">
			<!-- Sidebar content here -->
			<div class="flex justify-between items-center mb-6 mt-2 ml-4">
				<a href="/admin" class="btn btn-ghost normal-case text-xl">Admin</a>

				<label for="my-drawer-2" class="md:hidden btn btn-circle btn-sm btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/></svg
					>
				</label>
			</div>
			<ButtonDrawerAdmin
				isJadwal={true}
				drawerContent={{
					value: 'Jadwal'
				}}
				drawerContentIsActive={drawerContent.value === 'Jadwal'}
			/>
			<ButtonDrawerAdmin
				drawerContent={{
					value: 'Guru'
				}}
				drawerContentIsActive={drawerContent.value === 'Guru'}
			/>
			<ButtonDrawerAdmin
				drawerContent={{
					value: 'Siswa'
				}}
				drawerContentIsActive={drawerContent.value === 'Siswa'}
			/>
		</ul>
	</div>
</div>

<input type="checkbox" id="my-modal-6" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg text-center">Are you sure ?</h3>
		<p class="py-4 text-center">
			Do you really want to delete these jadwal? This process cannot be undone.
		</p>

		<form class="modal-action" method="post">
			<input name="id" hidden value={deleteId + '::' + deleteW} />

			<button class="flex-1" type="submit"
				><label data-sveltekit-reload class="btn btn-error w-full" for="my-modal-6">YES</label>
			</button>

			<div class="flex-1">
				<label for="my-modal-6" class="btn w-full ">No</label>
			</div>
		</form>
	</div>
</div>
