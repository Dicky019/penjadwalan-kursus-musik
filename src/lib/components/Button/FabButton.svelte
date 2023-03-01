<script lang="ts">
	export let href = '';

	export let isAdmin = true;

	export let onClick = () => {};
</script>

<button
	on:click={onClick}
	class="btn btn-circle btn-primary lg:btn-lg fixed z-90 bottom-28 right-8"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		class="w-6 h-6"
	>
		<path
			fill-rule="evenodd"
			d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
			clip-rule="evenodd"
		/>
		<path
			d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"
		/>
	</svg>
</button>

{#if isAdmin}
	<a {href} class="btn btn-circle lg:btn-lg fixed z-90 bottom-10 right-8">
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
