<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-french-toast';
    import type { PageData } from './$types';
    
    export let data: PageData;


    let loading = false
</script>

<h1>Register</h1>



<div class="stack">
	<div class="flex h-screen items-center justify-center ">
		<div class="w-[34rem] mx-2 sm:m-0  rounded-xl shadow-lg p-8 sm:p-12">
			<h1 class="mb-1 text-5xl font-bold">Sign In</h1>
			<h2 class="mb-4 text-xl">Please sign in to your account.</h2>
			<form
				method="post"
				use:enhance={({ form }) => {
					return async ({ result, update }) => {
						switch (result.type) {
							case 'success':
								toast.success(`Selamat Datang ${result.data?.username}`);
								break;
							case 'error':
								break;
							case 'failure':
								break;
							default:
								break;
						}
					};
				}}
			>
				<label for="email" class="label">Email</label>
				<input
					type="email"
					placeholder="example@mail.com"
					id="email"
					name="email"
					class="input input-bordered input-primary w-full mb-1"
				/>
				<label for="password" class="label">Password</label>
				<input
					type="password"
					placeholder="password"
					id="password"
					name="password"
					class="input input-bordered input-primary w-full"
				/>

				<input type="submit" value="Login" class="btn btn-block mt-10" disabled={loading} />
			</form>
		</div>
	</div>

	<!-- <img src={photo} alt="" srcset="" /> -->
</div>
