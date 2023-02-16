<script lang="ts">
	import { Empty } from '$lib/components';
	import { deleteWithIdWritable } from '$lib/stores';
	import type { Guru, Siswa } from '@prisma/client';

	import dayjs from 'dayjs';
	import 'dayjs/locale/id';
	import relativeTime from 'dayjs/plugin/relativeTime';

	dayjs.locale('id');
	dayjs.extend(relativeTime);

	export let user: (Guru | Siswa)[] = [];
	export let action = true;
	export let title = '';

	// let isShowPassword = user.map((v) => false);

	// const getPassword = (index: number, value: string) => {
	// 	return isShowPassword[index]
	// 		? value
	// 		: value
	// 				.split('')
	// 				.map((v) => '.')
	// 				.join('');
	// };

	// const showPassword = (index: number) => {
	// 	isShowPassword[index] = !isShowPassword[index];
	// 	console.log({ show: isShowPassword[index] });
	// };

	export let isGuru = false
</script>

{#if user && user.length > 0}
	<div class="divider text-2xl font-medium mx-4 my-8">{title}</div>
	<div class="overflow-x-auto m-4">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Id</th>
					<th>Full Name</th>
					<th>User Name</th>
					<th>Password</th>
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
				{#each user as { id, fullName, username, password, alamat, jenisKelamin, tanggalLahir, tempat }, i}
					<tr>
						<td>{id}</td>
						<td>
							<div class="font-bold">{fullName ?? '...'}</div>
						</td>
						<td>
							{username}
						</td>
						<td>
							{password}
							<!-- <div class="flex gap-x-3">
								<div>{getPassword(i, password)}</div>
								<button on:click={() => showPassword(i)} class="btn btn-info btn-xs">detail</button>
							</div> -->
						</td>
						<td>{alamat}</td>
						<td>
							{jenisKelamin === 'LakiLaki' ? 'Laki-Laki' : jenisKelamin}
						</td>
						<td>
							{tempat}, {dayjs(tanggalLahir).format('MMMM D, YYYY')}
						</td>
						{#if action}
							<th>
								<div class="flex">
									<a href="/admin/{title.toLowerCase()}/{id}" class="btn btn-warning btn-xs"
										>change</a
									>
									<div class="divider divider-horizontal" />
									<button
										on:click={() =>
											deleteWithIdWritable.set({
												value: id,
												delete: title
											})}
										class="btn btn-error btn-xs"
									>
										<label for="my-modal-6">delete</label>
									</button>
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
					<th>Id</th>
					<th>Full Name</th>
					<th>User Name</th>
					<th>Password</th>
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

	{#if !isGuru}
		<a
			href="/admin/{title.toLowerCase()}"
			class="btn btn-circle lg:btn-lg fixed z-90 bottom-10 right-8"
		>
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
	<Empty empty={title + ' Kosong'} href="/admin/{title.toLowerCase()}" />
{/if}
