<script lang="ts">
	import type { PageData } from './$types';

	import { Header } from '$lib/components';


	export let data: PageData;

	const jadwal = data.siswa?.jadwal ?? [];
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
				<th>Waktu</th>
				<th>Kategori Kursus</th>
				<!-- <th>Keterangan Masuk</th> -->
			</tr>
		</thead>
		<!-- head -->
		<tbody>
			<!-- row 1 -->
			{#each jadwal as { ruangan, hari, jam, kategoriKursus, guru }, i}
				<tr>
					<td>{ruangan}</td>
					<td>
						<div>
							<div class="font-bold">{guru.fullName ?? '...'}</div>
							<div class="text-sm opacity-50">{guru.username ?? '...'}</div>
						</div>
					</td>
					
					<td>{`${hari}, ${jam}`}</td>
					<!-- <td>{dayjs(waktu).format('dddd, HH:mm')}</td> -->
						
					<td>
						{kategoriKursus}
					</td>
					<!-- <td>
						<input type="checkbox" disabled checked={keteranganMasuk} class="checkbox" />
					</td> -->
				</tr>
			{/each}
			<!-- row 1 -->
		</tbody>

		<!-- foot -->
		<tfoot>
			<tr>
				<th>Ruangan</th>
				<th>Nama Guru</th>
				<th>Waktu</th>
				<th>Kategori Kursus</th>
				<!-- <th>Keterangan Masuk</th> -->
			</tr>
		</tfoot>
		<!-- foot -->
	</table>
</div>

<!-- <label class="label cursor-pointer">
    <span class="label-text">Remember me</span> 
    <input type="checkbox" checked="checked" class="checkbox" />
  </label> -->
