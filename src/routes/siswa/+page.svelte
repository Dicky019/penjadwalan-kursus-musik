<script lang="ts">
	import type { PageData } from './$types';

	import { Header,Empty } from '$lib/components';

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

{#if jadwal && jadwal.length > 0}
	
<div class="overflow-x-auto m-4">
	<table class="table w-full ">
		<!-- head -->
		<thead>
			<tr>
				<th>Nama Guru</th>
				<th>Hari</th>
				<th>Ruangan</th>
				<th>Jam</th>
				<th>Hari Penganti</th>
				<th>Ruangan Penganti</th>
				<th>Jam Penganti</th>
				
				<th>Kategori Kursus</th>
				<!-- <th>Keterangan Masuk</th> -->
			</tr>
		</thead>
		<!-- head -->
		<tbody>
			<!-- row 1 -->
			{#each jadwal as { ruangan, hari, jam,ruanganPenganti, hariPenganti, jamPenganti, kategoriKursus, guru }, i}
				<tr>
					<td>
						<div>
							<div class="font-bold">{guru.fullName ?? '...'}</div>
							<div class="text-sm opacity-50">{guru.username ?? '...'}</div>
						</div>
					</td>
					<td>{hari}</td>
					<td>{ruangan}</td>
					<td>{jam}</td>
					<td>{hariPenganti}</td>
					<td>{ruanganPenganti}</td>
					<td>{jamPenganti}</td>
					
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
				<th>Nama Guru</th>
				<th>Hari</th>
				<th>Ruangan</th>
				<th>Jam</th>
				<th>Hari Penganti</th>
				<th>Ruangan Penganti</th>
				<th>Jam Penganti</th>
				
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

{:else}
	<Empty isAdmin={false} empty={"Jadwal Kosong"}/>
{/if}
