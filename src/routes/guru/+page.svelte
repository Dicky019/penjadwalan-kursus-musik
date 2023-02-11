<script lang="ts">
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import 'dayjs/locale/id';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { Header } from '$lib/components';

	dayjs.locale('id');
	dayjs.extend(relativeTime);

	export let data: PageData;

	const jadwal = data.guru?.Jadwal ?? [];
</script>

<svelte:head>
	<title>Guru | {data.guru?.username}</title>
</svelte:head>

<Header
	data={{
		url: '/guru',
		name: 'Guru'
	}}
/>

<div class="overflow-x-auto m-4">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Ruangan</th>
				<th>Tanggal</th>
				<th>Jam</th>
				<th>Kategori Kursus</th>
				<th>Keterangan Masuk</th>
				<th>Jumlah Siswa</th>
				<th />
			</tr>
		</thead>
		<!-- head -->
		<tbody>
			<!-- row 1 -->
			{#each jadwal as { ruangan, waktu, kategoriKursus, keteranganMasuk, siswa }, i}
				<tr>
					<td>{ruangan}</td>
					<td>
						{dayjs(waktu).format('dddd MMMM YYYY')}
					</td>
					<td>{dayjs(waktu).format('HH:mm')}</td>
					<td>
						{kategoriKursus}
					</td>
					<td>
						<input type="checkbox" checked={keteranganMasuk} class="checkbox" />
					</td>
					<td>
						{siswa.length ?? '...'}
					</td>
					<th>
						<button class="btn btn-primary btn-xs">detail</button>
						<button class="btn btn-warning btn-xs">change</button>
					</th>
				</tr>
			{/each}
			<!-- row 1 -->
		</tbody>

		<!-- foot -->
		<tfoot>
			<tr>
				<th>Ruangan</th>
				<th>Tanggal</th>
				<th>Jam</th>
				<th>Kategori Kursus</th>
				<th>Keterangan Masuk</th>
				<th>Jumlah Siswa</th>
				<th />
			</tr>
		</tfoot>
		<!-- foot -->
	</table>
</div>
