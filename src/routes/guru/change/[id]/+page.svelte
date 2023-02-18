<script lang="ts">
	import type { IFilterJadwalKosong, IJadwal } from '$lib/types';
	import toast from 'svelte-french-toast';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;

	export let form: ActionData;

	if (form !== null) {
		if (form?.error) {
			toast.error(`${form?.message}`);
			form = null;
		} else {
			toast.success(`Berhasil Ganti Jadwal ${form.message}`);
			form = null;
		}
	}

	const raunganDanKategoriKursus = {
		Keyboard: ['Satu', 'Dua'],
		Drum: ['Dua', 'Tiga'],
		Gitar: ['Satu', 'Tiga']
	};

	const jadwal = data?.jadwal;

	const kategoriKursus = jadwal?.kategoriKursus ?? 'Keyboard';

	const listRuangan = raunganDanKategoriKursus[kategoriKursus];
	const listHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Sabtu'];
	const listJam: string[] = ['17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'];

	let hari = jadwal?.hari ?? '';

	const jadwalYangDiPilihSenin: IFilterJadwalKosong[][] = listRuangan.map((r) => {
		const val = listJam.map((v) => {
			return {
				ruangan: r,
				hari: 'Senin',
				jam: v
			};
		});

		return val;
	});

	let jadwalSenin = [...jadwalYangDiPilihSenin[0], ...jadwalYangDiPilihSenin[1]];

	const jadwalYangDiPilihSelasa: IFilterJadwalKosong[][] = listRuangan.map((r) => {
		const val = listJam.map((v) => {
			return {
				ruangan: r,
				hari: 'Selasa',
				jam: v
			};
		});
		return val;
	});

	let jadwalSelasa = [...jadwalYangDiPilihSelasa[0], ...jadwalYangDiPilihSelasa[1]];

	const jadwalYangDiPilihRabu: IFilterJadwalKosong[][] = listRuangan.map((r) => {
		const val = listJam.map((v) => {
			return {
				ruangan: r,
				hari: 'Rabu',
				jam: v
			};
		});
		return val;
	});

	let jadwalRabu = [...jadwalYangDiPilihRabu[0], ...jadwalYangDiPilihRabu[1]];

	const jadwalYangDiPilihKamis: IFilterJadwalKosong[][] = listRuangan.map((r) => {
		const val = listJam.map((v) => {
			return {
				ruangan: r,
				hari: 'Kamis',
				jam: v
			};
		});
		return val;
	});

	let jadwalKamis = [...jadwalYangDiPilihKamis[0], ...jadwalYangDiPilihKamis[1]];

	const jadwalYangDiPilihSabtu: IFilterJadwalKosong[][] = listRuangan.map((r) => {
		const val = listJam.map((v) => {
			return {
				ruangan: r,
				hari: 'Sabtu',
				jam: v
			};
		});
		return val;
	});

	let jadwalSabtu = [...jadwalYangDiPilihSabtu[0], ...jadwalYangDiPilihSabtu[1]];

	let jadwalKosong = [
		...jadwalSenin,
		...jadwalSelasa,
		...jadwalRabu,
		...jadwalKamis,
		...jadwalSabtu
	];

	// console.log({ jadwalKosong });

	const getJadwalDiHapus = () => {
		let val = data.jadwals?.filter((value) => {
			return value.ruangan === listRuangan[0] || value.ruangan === listRuangan[1];
		});

		const filterJadwalKosong = (va: IFilterJadwalKosong, element: IJadwal) => {
			// console.log(va, element);

			if (
				element.hariPenganti !== null &&
				element.jamPenganti !== null &&
				element.ruanganPenganti !== null
			) {
				if (
					va.hari === element.hariPenganti &&
					va.jam === element.jamPenganti &&
					va.ruangan === element.ruanganPenganti
				) {
					return false;
				}
			}

			if (va.hari === element.hari && va.jam === element.jam && va.ruangan === element.ruangan) {
				return false;
			}

			return true;
		};

		val?.forEach((element) => {
			jadwalKosong = jadwalKosong?.filter((va) => filterJadwalKosong(va, element));
		});

		// return val;
	};

	// getJadwalDiHapus();

	$: getJadwalKosong = (limit: number | undefined = undefined) => {
		const value = hari !== 'Semua' ? jadwalKosong.filter((v) => v.hari === hari) : jadwalKosong;

		return limit ? jadwalKosong.slice(0, limit) : value;
	};

	// console.log(data.jadwals, { jadwalKosong });

	// console.log({ listJadwalsKosong });
</script>

<svelte:head>
	<title>Change Jadwal | {data.jadwal?.guru.username}</title>
</svelte:head>

<div class="flex justify-center my-14">
	<form method="post" class="w-[48rem] mx-4 flex flex-col">
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

		<div class="text-4xl font-bold my-4">Change Jadwal {kategoriKursus}</div>

		<div class="w-full h-1 mb-3 bg-primary rounded-lg" />

		<label for="hari" class="label">Pilih Hari Kosong</label>
		<select bind:value={hari} class="select select-primary w-full" id="hari">
			<option value="Semua">Semua</option>
			{#each listHari as item}
				<option value={item}>{item}</option>
			{/each}
		</select>

		<label for="Jadwal" class="label">Pilih Jadwal Kosong</label>
		<select class="select select-primary w-full" id="Jadwal" name="jadwalkosong">
			{#each getJadwalKosong() as item, i}
				{#if i === 0}
					<option selected value={JSON.stringify(item)}>{item.ruangan}: {item.jam}</option>
				{:else}
					<option value={JSON.stringify(item)}>{item.ruangan}: {item.jam}</option>
				{/if}

				<!-- <input type="hidden" value={item.hari} name="hari" />
				<input type="hidden" value={item.jam} name="jam" />
				<input type="hidden" value={item.ruangan} name="ruangan" /> -->
			{/each}
		</select>
		<div class="text-2xl font-semibold mt-4 mb-2">Jadwal Sekarang</div>

		<div class="w-full h-[3px] mb-3 bg-primary rounded-lg" />
		
		<div class="flex flex-wrap gap-3 justify-center ">
			<div class="text-center border-2 rounded-md p-2 w-1/3 border-primary">
				<div>Jadwal Normal :</div>
				<span class="text-lg font-bold ">
					{jadwal?.ruangan}
				</span>
				: {jadwal?.hari}, {jadwal?.jam}
			</div>
			<div class="text-center border-2 rounded-md p-2 w-1/3 border-primary">
				<div>Jadwal Penganti :</div>
				<span class="text-lg font-bold ">
					{jadwal?.ruanganPenganti}
				</span>
				: {jadwal?.hariPenganti}, {jadwal?.jamPenganti}
			</div>
		</div>
		<div class="text-2xl font-semibold mt-4 mb-2">Jadwal Yang Paling Dekat</div>

		<div class="w-full h-[3px] mb-3 bg-primary rounded-lg" />

		<div class="flex flex-wrap gap-3 justify-center">
			{#each getJadwalKosong(6) as item}
				<div class="text-center border-2 rounded-md p-2 w-full sm:w-60 border-primary">
					<span class="text-lg font-bold ">
						{item.ruangan}
					</span>
					: {item.hari}, {item.jam}
				</div>
			{/each}
		</div>

		<input class="btn mt-10 mb-4" type="submit" value="Change" />
	</form>
</div>
