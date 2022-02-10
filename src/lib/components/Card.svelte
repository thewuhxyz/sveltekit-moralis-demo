<script lang="ts">
	import { resolveLink } from '$lib/utils/useIPFS';
	import Modal from './Modal.svelte';

	let hidden = true;

	export let nft;
</script>

<div class="max-w-sm bg-red-300 p-4 m-2 mx-auto">
	<img class="object-contain" src={resolveLink(nft.image)} alt={`${nft.name}`} />
	<div>{nft.name}</div>
	<div class="flex flex-row justify-around">
		<button on:click={() => (hidden = !hidden)}>A</button>
		<button>B</button>
		<button>C</button>
	</div>
</div>

<!-- <Modal {nft} {hidden} /> -->

<div
	class={`${
		hidden ? 'hidden' : ''
	} fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
>
	<div class="relative items-center top-20">
		<div class="mx-auto p-5 border h-auto w-96 shadow-lg rounded-md bg-white">
			<button on:click={() => (hidden = true)}>X</button>

			<img class="object-contain" src={resolveLink(nft.image)} alt={`${nft.name}`} />
			<div>{nft.name}</div>
			<button class="bg-blue-300 p-2 py-1 rounded-md"> BUY 3 ETH</button>
		</div>
	</div>
</div>
