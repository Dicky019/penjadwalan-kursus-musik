<script lang="ts">
	import type { Guru, Siswa } from '@prisma/client';

	import dayjs from 'dayjs';
	import 'dayjs/locale/id';
	import relativeTime from 'dayjs/plugin/relativeTime';

	dayjs.locale('id');
	dayjs.extend(relativeTime);

	export let user: (Guru | Siswa)[] = [];
	export let action = true;
	export let title = ""
</script>

<div class="divider text-2xl font-medium mx-4 my-8">{title}</div>

{#if user}
	<div class="overflow-x-auto m-4">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Nomor</th>
					<th>Name</th>
					<th>User Name</th>
					<th>Alamat</th>
					<th>Jenis Kelamin</th>
					<th>Tempat Tanggal Lahir</th>
					{#if action}
						<th />
					{/if}
				</tr>
			</thead>
			<!-- head -->
			<tbody>
				<!-- row 1 -->
				{#each user as { fullName, username, alamat, jenisKelamin, ttl }, i}
					<tr>
						<td>{i + 1}</td>
						<td>
							<div class="font-bold">{fullName ?? '...'}</div>
						</td>
						<td>
							{username}
						</td>
						<td>{alamat}</td>
						<td>
							{jenisKelamin}
						</td>
						<td>
							{dayjs(ttl).format('MMMM D, YYYY')}
						</td>
						{#if action}
							<th>
								<div class="flex">
									<button class="btn btn-warning btn-xs">change</button>
									<div class="divider divider-horizontal" />
									<button class="btn btn-error btn-xs">delete</button>
								</div>
							</th>
						{/if}
					</tr>
				{/each}
				<!-- row 1 -->
			</tbody>

			<!-- foot -->
			<tfoot>
				<tr>
					<th>Nomor</th>
					<th>Name</th>
					<th>User Name</th>
					<th>Alamat</th>
					<th>Jenis Kelamin</th>
					<th>Tempat Tanggal Lahir</th>
					{#if action}
						<th />
					{/if}
				</tr>
			</tfoot>
			<!-- foot -->
		</table>
	</div>
{:else}
	<div class="text-center text-2xl font-medium mx-4 my-8">Kosong</div>
{/if}
