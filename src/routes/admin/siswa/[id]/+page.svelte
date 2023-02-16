<script lang="ts">
	import { FormUser } from '$lib/components';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';
	import type { PageData } from './$types';

	export let data: PageData;

    const {user} =data

	export let form: ActionData;

	if (form !== null) {
		if (form?.error) {
			toast.error(`${form?.message}`);
			form = null;
		} else {
			toast.success(`Berhasil Di Update ${form.message}`);
			form = null;
		}
	}
</script>

<FormUser title="Siswa" isUpdate={true} {user} />
