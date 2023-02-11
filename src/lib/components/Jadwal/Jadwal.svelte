<script lang="ts">
	import { User } from '$lib/components';
	import type { IChangeDetailSiswa, IJadwal } from '$lib/types';
	import dayjs from 'dayjs';
	import 'dayjs/locale/id';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { changeDetailSiswaWritable } from '$lib/stores/';

	dayjs.locale('id');
	dayjs.extend(relativeTime);

	export let jadwal: IJadwal[] = [];

	let changeDetailSiswa: IChangeDetailSiswa;

	changeDetailSiswaWritable.subscribe((v) => {
		changeDetailSiswa = v;
	});

	function change(v: IChangeDetailSiswa) {
		changeDetailSiswaWritable.set(v);
	}

	change({
		listSiswa: jadwal[0].siswa,
		guru: jadwal[0].guru
	});
</script>

<div class="divider text-2xl font-medium mx-4 my-8">Jadwal</div>

{#if jadwal}
	<div class="overflow-x-auto m-4">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Ruangan</th>
					<th>Waktu</th>
					<th>Keterangan Masuk</th>
					<th>Guru</th>
					<th>Jumlah Siswa</th>
					<th>Kategori Kursus</th>
					<th />
				</tr>
			</thead>
			<!-- head -->
			<tbody>
				<!-- row 1 -->
				{#each jadwal as { ruangan, waktu, keteranganMasuk, guru, siswa, kategoriKursus }, i}
					<tr>
						<td>{ruangan}</td>
						<td>
							{dayjs(waktu).format('MMMM D, YYYY HH:mm')}
						</td>
						<td><input type="checkbox" disabled checked={keteranganMasuk} class="checkbox" /></td>
						<td>
							<div>
								<div class="font-bold">{guru.fullName ?? '...'}</div>
								<div class="text-sm opacity-50">{guru.username ?? '...'}</div>
							</div>
						</td>
						<td>
							<div class="flex gap-x-3">
								<div>{siswa.length} Siswa</div>
								<button
									on:click={() =>
										change({
											guru: guru,
											listSiswa: siswa
										})}
									class="btn btn-info btn-xs">detail</button
								>
							</div>
						</td>
						<td>
							{kategoriKursus}
						</td>
						<td>
							<div class="flex">
								<button class="btn btn-warning btn-xs">change</button>
								<div class="divider divider-horizontal" />
								<label for="my-modal-6" class="btn btn-error btn-xs">delete</label>
							</div>
						</td>
					</tr>
				{/each}
				<!-- row 1 -->
			</tbody>

			<!-- foot -->
			<tfoot>
				<tr>
					<th>Ruangan</th>
					<th>Waktu</th>
					<th>Keterangan Masuk</th>
					<th>Guru</th>
					<th>Jumlah Siswa</th>
					<th>Kategori Kursus</th>
					<th />
				</tr>
			</tfoot>
			<!-- foot -->
		</table>
	</div>

	<User
		user={changeDetailSiswa.listSiswa}
		title="Detail Siswa : {changeDetailSiswa.guru.username}"
		action={false}
	/>
{:else}
	"text"
{/if}

<!-- The button to open modal -->

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-6" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
		<p class="py-4">
			You've been selected for a chance to get one year of subscription to use Wikipedia for free!
		</p>
		<div class="modal-action">
			<label for="my-modal-6" class="btn flex-1 btn-error">Yes</label>
			<label for="my-modal-6" class="btn flex-1">No</label>
		</div>
	</div>
</div>
