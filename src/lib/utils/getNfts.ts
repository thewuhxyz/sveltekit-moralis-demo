import { NFTS } from '$lib/stores/currentUser';

export const getNfts = async (address = '0xaAdBA140Ae5e4c8a9eF0Cc86EA3124b446e3E46A') => {
	const data = await Moralis.Web3API.token.getAllTokenIds({
		address,
		limit: 20
	});
	const tokens = data.result;
	const nfts = tokens.map((token) => {
		const metadata = JSON.parse(token.metadata);
		return {
			metadata,
			tokenId: token.token_id,
			name: `${token.name} #${token.token_id}`,
			image: metadata.image
		};
	});
	NFTS.set(nfts);
};
