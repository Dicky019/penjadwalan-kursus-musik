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

	const guru = data.jadwal;
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

<div>26-5-9-25-6-11-24-7</div>

{26+5}-{9+25}-{6+11}-{24+7}

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
				<th />
			</tr>
		</thead>
		<!-- head -->
		<tbody>
			<!-- row 1 -->
			{#each jadwal as item, i}
				<tr>
					<td>{item.ruangan}</td>
					<td>
						<div>
							<div class="font-bold">{guru[i]?.fullName ?? '...'}</div>
							<div class="text-sm opacity-50">{guru[i]?.username ?? '...'}</div>
						</div>
					</td>
					<td>
						{dayjs(item.waktu).format('dddd MMMM YYYY')}
					</td>
					<td>{dayjs(item.waktu).format('HH:mm')}</td>
					<td>
						{item.kategoriKursus}
					</td>
					<td>
						<input type="checkbox" checked={item.keteranganMasuk} class="checkbox" />
					</td>
					<th>
						<button class="btn btn-xs">change</button>
					</th>
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
				<th />
			</tr>
		</tfoot>
		<!-- foot -->
	</table>
</div>

<!-- <label class="label cursor-pointer">
    <span class="label-text">Remember me</span> 
    <input type="checkbox" checked="checked" class="checkbox" />
  </label> -->
