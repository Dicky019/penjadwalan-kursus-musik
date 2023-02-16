<script lang="ts">
	import type { Guru, Siswa } from '@prisma/client';
	import SveltyPicker from 'svelty-picker';



	import dayjs from 'dayjs';
	import 'dayjs/locale/id';
	import relativeTime from 'dayjs/plugin/relativeTime';

	dayjs.locale('id');
	dayjs.extend(relativeTime);

	export let isUpdate: boolean = false;
	export let user: (Guru | Siswa) | null = null;

	export let title = 'Guru';

	const myDate =  dayjs(user?.tanggalLahir).format('YYYY-MM-DD') ??  '2001-08-11';
</script>

<svelte:head>
	<title>{isUpdate ? `Update ${title}` : `Create ${title}`}</title>
</svelte:head>

<div class="flex justify-center my-14">
	<form method="post" class="w-[44rem] mx-4 flex flex-col">
		<a href="/admin/" data-sveltekit-reload class="btn btn-circle my-4"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
				/>
			</svg>
		</a>
		<div class="text-4xl font-bold my-4">{isUpdate ? `Update ${title}` : `Create ${title}`}</div>

		<div class="w-full h-1 mb-3 bg-primary rounded-lg" />

		<label for="Full Name" class="label">Full Name</label>
		<input
			type="text"
			name="fullName"
			id="Full Name"
			placeholder="Full Name"
			value={user?.fullName}
			class="input input-primary w-full mb-2"
		/>

		<label for="User Name" class="label">User Name</label>
		<input
			type="text"
			name="userName"
			id="User Name"
			placeholder="User Name"
			value={user?.username}
			class="input input-primary w-full mb-2"
		/>

		<label for="Password" class="label">Password</label>
		<input
			type="text"
			name="password"
			id="Password"
			placeholder="Password"
			value={user?.password}
			class="input input-primary w-full mb-2"
		/>

		<label for="Alamat" class="label">Alamat</label>
		<input
			type="text"
			name="alamat"
			id="Alamat"
			placeholder="Alamat"
			value={user?.alamat}
			class="input input-primary w-full mb-2"
		/>

		<label for="Jenis Kelamin" class="label">Jenis Kelamin</label>
		<select
			class="select select-primary w-full mb-2"
			id="Jenis Kelamin"
			value={user?.jenisKelamin}
			name="jenisKelamin"
		>
			<option value="LakiLaki">Laki-Laki</option>
			<option value="Perempuan">Perempuan</option>
		</select>

		<div class="flex gap-x-4">
			<div class="flex-1">
				<label for="Tempat" class="label">Tempat</label>
				<input
					type="text"
					name="tempat"
					id="Tempat"
					placeholder="Tempat"
					value={user?.tempat}
					class="input input-primary w-full mb-2"
				/>
			</div>
			<div class="flex-1">
				<label for="Tanggal Lahir" class="label">Tanggal Lahir</label>
				<SveltyPicker
					inputId="Tanggal Lahir"
					name="tanggalLahir"
					inputClasses="select select-primary w-full mb-2"
					format="yyyy-mm-dd"
					value={myDate}
				/>
			</div>
		</div>

		<input class="btn mt-10 mb-4" type="submit" value={isUpdate ? 'Update' : 'Create'} />
	</form>
</div>
