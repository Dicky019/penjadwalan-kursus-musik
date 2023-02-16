<script lang="ts">
	import { FormUser } from '$lib/components';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';
    // import type { PageData } from './$types';
    
    // export let data: PageData;


    export let form: ActionData;

if (form !== null) {
    if (form?.error) {
        toast.error(`${form?.message}`);
        form = null;
    } else {
        toast.success(`Berhasil Di Tambah ${form.message}`);
        form = null;
    }
}
</script>

<FormUser title="Guru"/>
