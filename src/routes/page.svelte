<script lang="ts">
	import { isInitialized } from '$lib/stores/currentUser';

	$: console.log($isInitialized);
</script>

<div>
	<a href="/">Home Page</a>
	{$isInitialized}
</div>
