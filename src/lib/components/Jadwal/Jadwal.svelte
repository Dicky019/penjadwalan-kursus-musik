<script lang="ts">
	import { Empty } from '$lib/components';
	import { User } from '$lib/components';
	import type { IChangeDetailSiswa, IJadwal } from '$lib/types';
	import { changeDetailSiswaWritable, deleteWithIdWritable } from '$lib/stores/';

	export let jadwal: IJadwal[] = [];

	let changeDetailSiswa: IChangeDetailSiswa;

	changeDetailSiswaWritable.subscribe((v) => {
		changeDetailSiswa = v;
	});

	function change(v: IChangeDetailSiswa) {
		changeDetailSiswaWritable.set(v);
	}

	if (jadwal && jadwal.length > 0) {
		change({
			listSiswa: jadwal[0].siswa,
			guru: jadwal[0].guru,
			hari: jadwal[0].hari,
			jam: jadwal[0].jam,
			ruangan: jadwal[0].ruangan
		});
	}

	export let isGuru = false;
</script>

{#if jadwal && jadwal.length > 0}
	<div class="divider text-2xl font-medium mx-4 my-8">Jadwal</div>
	<div class="overflow-x-auto m-4">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					{#if !isGuru}
						<th>ID</th>
					{/if}
					<th>Hari</th>
					<th>Ruangan</th>
					<th>Jam</th>
					{#if isGuru}
						<th>Hari Penganti</th>
						<th>Ruangan Penganti</th>
						<th>Jam Penganti</th>
					{/if}
					{#if !isGuru}
						<th>Guru</th>
					{/if}
					<th>Kategori Kursus</th>
					<th>Jumlah Siswa</th>
					<th />
				</tr>
			</thead>
			<!-- head -->
			<tbody>
				<!-- row 1 -->
				{#each jadwal as { id, ruangan, hari, jam, guru, siswa, kategoriKursus, ruanganPenganti, hariPenganti, jamPenganti }, i}
					<tr>
						{#if !isGuru}
							<td>{id}</td>
						{/if}
						<td>{hari}</td>
						<td>{ruangan}</td>
						<td>{jam}</td>
						{#if isGuru}
							<!-- <td>{hari}</td> -->
							<td>{hariPenganti !== null ? hariPenganti : '-'}</td>
							<td>{ruanganPenganti !== null ? ruanganPenganti : '-'}</td>
							<td>{jamPenganti !== null ? jamPenganti : '-'}</td>
						{/if}
						{#if !isGuru}
							<td>
								<div>
									<div class="font-bold">{guru.fullName ?? '...'}</div>
									<div class="text-sm opacity-50">{guru.username ?? '...'}</div>
								</div>
							</td>
						{/if}
						<td>
							{kategoriKursus}
						</td>
						<td>
							<div class="flex gap-x-3">
								<div>{siswa.length} Siswa</div>
								<button
									on:click={() =>
										change({
											listSiswa: siswa,
											guru: guru,
											hari: hari,
											jam: jam,
											ruangan: ruangan
										})}
									class="btn btn-info btn-xs">detail</button
								>
							</div>
						</td>
						<td>
							<a
								href="/{isGuru ? 'guru/change/' : 'admin/jadwal/'}{id}"
								class="btn btn-warning btn-xs mr-1">{isGuru ? 'Ganti Jadwal' : 'Change'}</a
							>
							{#if !isGuru}
								<button
									on:click={() =>
										deleteWithIdWritable.set({
											value: id,
											delete: 'Jadwal'
										})}><label class="btn btn-error btn-xs" for="my-modal-6">delete</label></button
								>
							{/if}
						</td>
					</tr>
				{/each}
				<!-- row 1 -->
			</tbody>

			<!-- foot -->
			<tfoot>
				<tr>
					{#if !isGuru}
						<th>ID</th>
					{/if}
					<th>Hari</th>
					<th>Ruangan</th>
					<th>Jam</th>
					{#if isGuru}
						<th>Hari Penganti</th>
						<th>Ruangan Penganti</th>
						<th>Jam Penganti</th>
					{/if}
					{#if !isGuru}
						<th>Guru</th>
					{/if}
					<th>Kategori Kursus</th>
					<th>Jumlah Siswa</th>
					<th />
				</tr>
			</tfoot>
			<!-- foot -->
		</table>
	</div>

	<User
		user={changeDetailSiswa.listSiswa}
		title="Detail Siswa Ruangan {changeDetailSiswa.ruangan} : {changeDetailSiswa.hari}, {changeDetailSiswa.jam} | {changeDetailSiswa
			.guru.username}"
		action={false}
		{isGuru}
	/>

	{#if !isGuru}
		<a href="/admin/jadwal" class="btn btn-circle lg:btn-lg fixed z-90 bottom-10 right-8">
			<svg
				viewBox="0 0 20 20"
				enable-background="new 0 0 20 20"
				class="w-6 h-6 lg:w-9 lg:h-9 inline-block"
			>
				<path
					fill="#FFFFFF"
					d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
					C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
					C15.952,9,16,9.447,16,10z"
				/>
			</svg>
		</a>
	{/if}
{:else}
	<Empty empty={'Jadwal Kosong'} href="/admin/jadwal" isAdmin={false} />
{/if}
