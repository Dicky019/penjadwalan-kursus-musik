<script lang="ts">
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import 'dayjs/locale/id';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { Header } from '$lib/components';

	dayjs.locale('id');
	dayjs.extend(relativeTime);

	export let data: PageData;

	const jadwal = data.siswa?.Jadwal ?? [];
</script>

<svelte:head>
	<title>Siswa | {data.siswa?.username}</title>
</svelte:head>

<Header
	data={{
		url: '/siswa',
		name: 'Siswa'
	}}
/>

<div class="overflow-x-auto m-4">
	<table class="table w-full ">
		<!-- head -->
		<thead>
			<tr>
				<th>Ruangan</th>
				<th>Nama Guru</th>
				<th>Tanggal</th>
				<th>Jam</th>
				<th>Kategori Kursus</th>
				<th>Keterangan Masuk</th>
			</tr>
		</thead>
		<!-- head -->
		<tbody>
			<!-- row 1 -->
			{#each jadwal as { ruangan, waktu, kategoriKursus, keteranganMasuk, guru }, i}
				<tr>
					<td>{ruangan}</td>
					<td>
						<div>
							<div class="font-bold">{guru.fullName ?? '...'}</div>
							<div class="text-sm opacity-50">{guru.username ?? '...'}</div>
						</div>
					</td>
					<td>
						{dayjs(waktu).format('dddd MMMM YYYY')}
					</td>
					<td>{dayjs(waktu).format('HH:mm')}</td>
					<td>
						{kategoriKursus}
					</td>
					<td>
						<input type="checkbox" disabled checked={keteranganMasuk} class="checkbox" />
					</td>
				</tr>
			{/each}
			<!-- row 1 -->
		</tbody>

		<!-- foot -->
		<tfoot>
			<tr>
				<th>Ruangan</th>
				<th>Nama Guru</th>
				<th>Tanggal</th>
				<th>Jam</th>
				<th>Kategori Kursus</th>
				<th>Keterangan Masuk</th>
			</tr>
		</tfoot>
		<!-- foot -->
	</table>
</div>

<!-- <label class="label cursor-pointer">
    <span class="label-text">Remember me</span> 
    <input type="checkbox" checked="checked" class="checkbox" />
  </label> -->
