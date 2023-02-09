<script lang="ts">
	import photo from '$lib/images/photo.avif';
</script>


<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="hero min-h-screen" style="background-image: url({photo});">
	<div class="hero-overlay bg-opacity-90" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-xl">
			<h1 class="mb-5 sm:text-6xl text-5xl font-bold">Theo Music School</h1>
			<p class="mb-5">
				Theo Music School merupakan salah satu tempat kursus musik yang beralamat di Jl. Daeng
				Ramang, kompleks perumahan rammang royal regency (ERTIGA) Blok.B No.5, yang menyediakan jasa
				dan beberapa fasilitas kursus musik.
			</p>
			<a class="btn btn-primary" href="/login">Get Started</a>
		</div>
	</div>
</div>