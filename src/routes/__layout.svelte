<script>
	import Nav from '$lib/components/Nav.svelte';
	import { MoralisInit } from '$lib/utils/MoralisUtil';
	import { onMount } from 'svelte';
	import '../app.css';
	import { status } from '$lib/stores/status';

	$: console.log($status);
	// if ($isInitialized === false) {
	onMount(() => {
		const main = async () => {
			await MoralisInit();
		};
		main();
	});
	// }
</script>

<div>
	<Nav />
	<slot />
</div>
