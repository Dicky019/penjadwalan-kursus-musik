<script lang="ts">
	import type { IFormJadwalSiswa, IJadwal } from '$lib/types';
	import type { Guru, Siswa } from '@prisma/client';
	import SveltyPicker from 'svelty-picker';

	export let listSiswa: Siswa[] = [];
	export let listGuru: Guru[] = [];

	export let jadwal: IJadwal | undefined | null = undefined;
	export let isUpdate: boolean = false;

	let listSiswaChecked: IFormJadwalSiswa[] = listSiswa.map((v) => {
		if (isUpdate) {
			const isSelect = jadwal?.siswa.find((p) => p.username === v.username) !== undefined;

			return {
				siswa: v,
				isSelect
			};
		}

		return {
			siswa: v,
			isSelect: false
		};
	});

	let valueGuru: string = jadwal?.guru.username ?? '';

	$: valueListSiswa = listSiswaChecked
		.filter(({ isSelect }) => {
			return isSelect;
		})
		.map(({ siswa }) => {
			return siswa.username;
		})
		.join(', ');

	let	valueListSiswaDisconect = listSiswaChecked
		.filter(({ isSelect }) => {
			return isSelect;
		})
		.map(({ siswa }) => {
			return siswa.username;
		})
		.join(', ');

	const raunganDanKategoriKursus = {
		Satu: ['Keyboard', 'Gitar'],
		Dua: ['Keyboard', 'Drum'],
		Tiga: ['Gitar', 'Drum']
	};

	let ruangan = jadwal?.ruangan ?? 'Satu';

	$: kategoriKursus = raunganDanKategoriKursus[ruangan];

	console.log(kategoriKursus,valueListSiswa);
</script>

<svelte:head>
	<title>{isUpdate ? 'Update Jadwal' : 'Create Jadwal'}</title>
</svelte:head>

<div class="flex justify-center my-14">
	<form method="post" class="w-[44rem] mx-4 flex flex-col">
		<a href="/admin/" data-sveltekit-reload class="btn btn-circle my-4"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
				/>
			</svg>
		</a>
		<div class="text-4xl font-bold my-4">{isUpdate ? 'Update Jadwal' : 'Create Jadwal'}</div>

		<div class="w-full h-1 mb-3 bg-primary rounded-lg" />

		<div class="flex gap-x-2">
			<div class="flex-1">
				<label for="kategoriKursus" class="label">Kategori Kursus</label>
				<select
					value={jadwal?.kategoriKursus ?? 'Keyboard'}
					class="select select-primary w-full"
					id="kategoriKursus"
					name="kategoriKursus"
				>
					{#each kategoriKursus as item}
						<option value={item}>{item}</option>
					{:else}
						<!-- empty list -->
						<option value="Keyboard">Keyboard</option>
						<option value="Drum">Drum</option>
						<option value="Gitar">Gitar</option>
					{/each}
					<!--   Keyboard Drum Gitar -->
				</select>
			</div>
			<div class="flex-1">
				<label for="ruangan" class="label">Ruangan</label>
				<select
					bind:value={ruangan}
					class="select select-primary w-full"
					id="ruangan"
					name="ruangan"
				>
					<option value="Satu">Satu</option>
					<option value="Dua">Dua</option>
					<option value="Tiga">Tiga</option>
				</select>
			</div>
		</div>

		<div class="flex gap-x-2">
			<div class="flex-1">
				<label for="jam" class="label">Jam</label>
				<select
					value={jadwal?.jam ?? '17:00 - 18:00'}
					class="select select-primary w-full"
					id="jam"
					name="jam"
				>
					<option value="17:00 - 18:00">17:00 - 18:00</option>
					<option value="18:00 - 19:00">18:00 - 19:00</option>
					<option value="19:00 - 20:00">19:00 - 20:00</option>
					<option value="20:00 - 21:00">20:00 - 21:00</option>
				</select>
			</div>

			<div class="flex-1">
				<label for="hari" class="label">Hari</label>
				<select
					value={jadwal?.hari ?? 'Senin'}
					class="select select-primary w-full"
					id="hari"
					name="hari"
				>
					<option value="Senin">Senin</option>
					<option value="Selasa">Selasa</option>
					<option value="Rabu">Rabu</option>
					<option value="Kamis">Kamis</option>
					<!-- <option value="Jumat">Jumat</option> -->
					<option value="Sabtu">Sabtu</option>
					<!-- <option value="Minggu">Minggu</option> -->
				</select>
			</div>
		</div>

		<div class="dropdown ">
			<div tabindex="-1" class="label">Guru</div>
			<input
				readonly
				type="text"
				id="guru"
				name="guru"
				placeholder="Pilih Guru"
				bind:value={valueGuru}
				class="select select-primary w-full"
			/>
			<ul tabindex="-1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
				{#each listGuru as { username, fullName, id }, index}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li
						on:click={() => {
							valueGuru = username;
						}}
					>
						<label for="guru">
							<div class="flex gap-x-4">
								<div class="avatar placeholder">
									<div class="bg-neutral-focus text-neutral-content rounded-full w-12">
										<span class="text-xl">{id}</span>
									</div>
								</div>
								<div class="flex items-start flex-col">
									<div class="font-bold">{username}</div>
									<div class="text-sm opacity-50">{fullName}</div>
								</div>
							</div>
						</label>
					</li>
					{#if index !== listGuru.length - 1}
						<div class="flex justify-center">
							<div class="w-[98%] h-[3px] my-3 bg-slate-300 rounded-lg" />
						</div>
					{/if}
				{:else}
					<li><div class="font-bold">Guru Kosong</div></li>
				{/each}
			</ul>
		</div>

		<div class="dropdown">
			<div tabindex="-1" class="label">Daftar Siswa</div>
			<input type="hidden" value={valueListSiswaDisconect} name="valueListSiswaDisconect">
			<input
				readonly
				type="text"
				name="listSiswa"
				placeholder="Pilih Daftar Siswa"
				bind:value={valueListSiswa}
				class="select select-primary w-full"
			/>
			<ul tabindex="-1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
				{#each listSiswa as { id, fullName, username }, index}
					<li>
						<label class="flex">
							<div class="flex-1 flex gap-x-4">
								<div class="avatar placeholder">
									<div class="bg-neutral-focus text-neutral-content rounded-full w-12">
										<span class="text-xl">{id}</span>
									</div>
								</div>
								<div class="flex items-start flex-col">
									<div class="font-bold">{username}</div>
									<div class="text-sm opacity-50">{fullName}</div>
								</div>
							</div>
							<input
								type="checkbox"
								checked={listSiswaChecked[index].isSelect}
								on:change={({ currentTarget }) => {
									listSiswaChecked[index].isSelect = currentTarget.checked;
								}}
								class=" checkbox"
							/>
						</label>
					</li>

					{#if index !== listSiswa.length - 1}
						<div class="flex justify-center">
							<div class="w-[98%] h-[3px] my-3 bg-slate-300 rounded-lg" />
						</div>
					{/if}
				{:else}
					<li><div class="font-bold">Siswa Kosong</div></li>
				{/each}
			</ul>
		</div>

		<input class="btn my-10" type="submit" value={isUpdate ? 'Update' : 'Create'} />
	</form>
</div>
