<script lang="ts">
	import { onMount } from 'svelte';
	import { login, logOut, MoralisInit } from '$lib/utils/MoralisUtil';
	import { currentUser, isInitialized } from '$lib/stores/currentUser';
	import { truncate } from '$lib/utils/truncate';
	import { status } from '$lib/stores/status';
	import { chainlist } from '$lib/utils/chainlist';
	import { collections } from '$lib/utils/collections';
	import { getNfts } from '$lib/utils/getNfts';

	const toggle = () => ($currentUser ? logOut() : login());
	let search = '';

	let chainId;

	$: if ($status.isInitialized) {
		(Moralis as any).getChainId().then((data) => (chainId = data));
	}
	$: if ($status.isInitialized) {
		(Moralis as any).onChainChanged(() =>
			(Moralis as any).getChainId().then((data) => (chainId = data))
		);
	}

	let selected;

	$: console.log(selected);

	let result = [];

	$: {
		if (search) {
			result = collections.filter((collection) => {
				return collection.name.toLowerCase().includes(search);
			});
			console.log(result);
		}
	}

	const changeChain = async (chainId) => {
		try {
			await (Moralis as any).switchNetwork(chainId);
			status.update((stat) => {
				return { ...stat, chainId: selected };
			});
		} catch (e) {
			console.log(`${e.code}: \n${e.message}`);
			if (e.code == 4902) alert('Add the new network');
			if (e.code == 4001) console.log('You rejected change');
			selected = $status.chainId || '0x2a';
			console.log(selected);
		}
	};

	// $: console.log(search);
</script>

<div class="bg-cyan-300 h-12 max-w-6xl justify-around flex flex-row mx-auto">
	<div class="bg-red-400 m-1 w-32 block text-center my-auto  ">
		<h1 class="bg-gray-200">The Grxxn Mart</h1>
	</div>
	<div class="relative flex mx-2">
		<input
			class="my-auto p-2 h-6 w-full  bg-gray-200"
			placeholder="Search Collections..."
			type="text"
			bind:value={search}
		/>
		<div class={`${!search ? 'hidden' : ''} absolute  translate-y-9  p-1 bg-emerald-600 w-full `}>
			{#if !result}
				<h1>No Such Collection</h1>
			{:else}
				{#each result as { name, address }}
					<div>
						<button
							on:click={() => {
								getNfts(address);
								search = '';
							}}>{name}</button
						>
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<button>Explore</button>
	<button>My Collections</button>
	<button>Transactions</button>
	<select bind:value={selected} on:change={() => changeChain(selected)} class="my-auto text-center">
		{#each chainlist as { name, chain }}
			<option value={chain}>{name}</option>
		{/each}
	</select>
	<button
		class={`${$status.isInitialized ? 'bg-teal-400' : 'bg-red-600'} p-2 border-2 border-teal-200 `}
		on:click={toggle}>{$currentUser ? truncate($currentUser.get('ethAddress')) : 'Login'}</button
	>
</div>
