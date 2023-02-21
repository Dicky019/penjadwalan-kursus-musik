<script lang="ts">
	import FabButton from './../Button/FabButton.svelte';
	import { Empty } from '$lib/components';
	import { User } from '$lib/components';
	import { jsPDF } from 'jspdf';
	import autoTable from 'jspdf-autotable';
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

	const onPdfAdmin = () => {
		const doc = new jsPDF('p', 'pt');
		const source = document.getElementById('content');

		if (source == null) {
			return;
		}

		const data = jadwal.map(({ hari, ruangan, jam, guru, kategoriKursus, siswa }, i) => [
			i + 1,
			hari,
			ruangan,
			jam,
			`${guru.fullName}\n${guru.username}`,
			kategoriKursus,
			siswa.length,
			siswa.map(({ username }) => {
				return username;
			})
		]);

		autoTable(doc, {
			head: [['No', 'Hari', 'Ruangan', 'Jam', 'Guru', 'Kategori Khusus', 'Jumlah Siswa', 'Siswa']],
			body: data,
			didDrawPage: function (data) {
				// Header
				doc.setFontSize(20);
				doc.setTextColor(40);
				doc.text('Jadwal Admin', data.settings.margin.left, 22);
			}
		});

		doc.save('jadwla-admin.pdf');
	};

	const onPdfGuru = () => {
		const doc = new jsPDF('l', 'pt');
		const source = document.getElementById('content');

		if (source == null) {
			return;
		}

		const data = jadwal.map(({ hari, ruangan, jam, guru, kategoriKursus, siswa,hariPenganti,jamPenganti,ruanganPenganti}, i) => [
			i + 1,
			hari,
			ruangan,
			jam,
			hariPenganti,
			ruanganPenganti,
			jamPenganti,
			`${guru.fullName}\n${guru.username}`,
			kategoriKursus,
			siswa.length,
			siswa.map(({ username }) => {
				return username;
			})
		]);

		autoTable(doc, {
			head: [
				[
					'No',
					'Hari',
					'Ruangan',
					'Jam',
					'Hari Penganti',
					'Ruangan Penganti',
					'Jam Penganti',
					'Guru',
					'Kategori Khusus',
					'Jumlah Siswa',
					'Siswa'
				]
			],
			body: data,
			didDrawPage: function (data) {
				// Header
				doc.setFontSize(20);
				doc.setTextColor(40);
				doc.text('Jadwal Guru', data.settings.margin.left, 22);
			}
		});

		doc.save('jadwal-guru.pdf');
	};
</script>

{#if jadwal && jadwal.length > 0}
	<div id="content">
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
											})}
										><label class="btn btn-error btn-xs" for="my-modal-6">delete</label></button
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

		<FabButton onClick={!isGuru ?onPdfAdmin : onPdfGuru} isAdmin={!isGuru} href="admin/jadwal/" />
	</div>
{:else}
	<Empty empty={'Jadwal Kosong'} href="/admin/jadwal" isAdmin={!isGuru} />
{/if}
