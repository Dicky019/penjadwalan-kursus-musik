<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const dummy = [
		{
			namaGuru: 'namaGuru',
			tanggal: new Date().toLocaleDateString(),
			jam:new Date().toLocaleTimeString()
		}
	];

	import { Header } from '$lib/components';
</script>

<Header />

<div class="overflow-x-auto w-full">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Nama Guru</th>
				<th>Tanggal</th>
				<th>Jam</th>
				<th />
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each dummy as item, i}
				<tr>
					<td>
						<div>
							<div class="font-bold">{item.namaGuru}</div>
							<div class="text-sm opacity-50">United States</div>
						</div>
					</td>
					<td>
						{item.tanggal}
					</td>
					<td>{item.jam}</td>
					<th>
						<button class="btn btn-ghost btn-xs">details</button>
					</th>
				</tr>
			{/each}
			<!-- row 1 -->
		</tbody>

		<!-- foot -->
		<tfoot>
			<tr>
				<th>Nama Guru</th>
				<th>Tanggal</th>
				<th>Jam</th>
				<th />
			</tr>
		</tfoot>
		<!-- foot -->
	</table>
</div>

<!-- <h1>Siswa {data.user?.email}</h1> -->
