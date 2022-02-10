<script lang="ts">
	import { resolveLink } from '$lib/utils/useIPFS';

	export let hidden;

	export let nft;
</script>

<div
	class={`${
		hidden ? 'hidden' : ''
	} fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
>
	<div class="relative items-center flex w-full h-full">
		<div class="mx-auto p-5 border h-96 w-96 shadow-lg rounded-md bg-white">
			<button on:click={() => (hidden = !hidden)}>X</button>

			<img class="object-contain" src={resolveLink(nft.image)} alt={`${nft.name}`} />
			<div>{nft.name}</div>
		</div>
	</div>
</div>
