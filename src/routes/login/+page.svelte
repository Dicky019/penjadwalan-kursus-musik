<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	let loading = false;

	import photo from '$lib/images/photo.avif';
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="hero min-h-screen w-full" style="background-image: url({photo});">
	<div class="hero-overlay bg-opacity-90" />
	<div class="hero-content text-center text-neutral-content" />
	<div class="flex h-screen items-center justify-center ">
		<div class="sm:w-[34rem] w-[95vw] sm:m-0 bg-white  rounded-xl shadow-lg p-8 sm:p-12">
			<h1 class="mb-1 text-5xl font-bold">Sign In</h1>
			<h2 class="mb-4 text-xl">Please sign in to your account.</h2>
			<form
				method="post"
				use:enhance={({ form }) => {
					loading = true
					return async ({ result, update }) => {

						switch (result.type) {
							case 'success':
								toast.success(`Selamat Datang ${result.data?.username}`);
								await update();
								break;
							case 'error':
								toast.error(result.error?.message);
								break;
							case 'failure':
								toast.error(result.data?.message);
								await update();
								break;
							default:
								await update();
								break;
						}
						loading = false
					};
				}}
			>
				<label for="username" class="label">Username</label>
				<input
					type="username"
					placeholder="example"
					id="username"
					name="username"
					required
					class="input input-bordered input-primary w-full mb-1"
				/>
				<label for="password" class="label">Password</label>
				<input
					type="password"
					placeholder="password"
					id="password"
					name="password"
					required
					class="input input-bordered input-primary w-full mb-1"
				/>

				<label for="role" class="label">Role</label>

				<select class="select select-primary w-full mb-2"  id="role" name="role">
					<option value="Admin">Admin</option>
					<option value="Guru">Guru</option>
					<option selected value="Siswa">Siswa</option>
				</select>

				<input type="submit" value="Login" class="btn btn-block mt-10 {loading ? 'loading' : ''}" />
			</form>
		</div>
	</div>
</div>
