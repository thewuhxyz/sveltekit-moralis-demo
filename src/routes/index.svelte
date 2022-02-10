<script lang="ts">
	import { isInitialized, NFTS } from '$lib/stores/currentUser';
	import Card from '$lib/components/Card.svelte';
	import { resolveLink } from '$lib/utils/useIPFS';
	import Modal from '$lib/components/Modal.svelte';
	import { status } from '$lib/stores/status';
	import { getNfts } from '$lib/utils/getNfts';

	// const getNfts = async () => {
	// 	const data = await Moralis.Web3API.token.getAllTokenIds({
	// 		// address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
	// 		// address: '0x1a92f7381b9f03921564a437210bb9396471050c',
	// 		// address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
	// 		// address: '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
	// 		address: '0xaAdBA140Ae5e4c8a9eF0Cc86EA3124b446e3E46A',
	// 		limit: 20
	// 	});
	// 	const tokens = data.result;
	// 	return tokens.map((token) => {
	// 		const metadata = JSON.parse(token.metadata);
	// 		return {
	// 			metadata,
	// 			tokenId: token.token_id,
	// 			name: `${token.name} #${token.token_id}`,
	// 			image: metadata.image
	// 		};
	// 	});
	// };

	let nfts;

	let loading = false;

	// console.log($isInitialized);

	$: console.log($status.isInitialized);

	$: $NFTS;

	$: if ($status.isInitialized) {
		// nfts = (async () => await getNfts())();
		loading = true;
		// getNfts()
		// 	.then((data) => {
		// 		nfts = data;
		// 		loading = false;
		// 	})
		// 	.catch((e) => {
		// 		console.log(e);
		// 		loading = false;
		// 	});
		getNfts()
			.then(() => {
				// nfts = data;
				loading = false;
			})
			.catch((e) => {
				console.log(e);
				loading = false;
			});
		// nfts = getNfts();
	}

	// const data = (nft) => nft;

	$: console.log(loading);
</script>

<svelte:head>
	<title>Moralis Demo</title>
</svelte:head>

<a href="/page">Some Page</a>

{#if loading}
	<h4>Loading</h4>
{:else if $NFTS}
	<div class="max-w-4xl justify-center m-auto grid gap-4 md:grid-cols-2 grid-cols-1 bg-gray-300">
		<!-- <Modal /> -->
		{#each $NFTS as nft (nft.tokenId)}
			<Card {nft} />
		{/each}
	</div>
{/if}
