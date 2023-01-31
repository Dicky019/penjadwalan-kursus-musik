<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>


<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="center">
	<article>
		<div>
			<hgroup>
				<h1>Sign in</h1>
				<h2>Don't have an account? <a href="/register">Register</a></h2>
			</hgroup>
			<form method="post">
				<input
					type="text"
					name="email"
					placeholder="Email"
					aria-label="Email"
					autocomplete="Email"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					aria-label="Password"
					autocomplete="current-password"
					required
				/>
				<fieldset>
					<label for="remember">
						<input type="checkbox" role="switch" id="remember" name="remember" />
						Remember me
					</label>
				</fieldset>
				<button type="submit" class="contrast">Login</button>
			</form>
		</div>
	</article>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 15px;
		margin-right: 15px;
	}
</style>
