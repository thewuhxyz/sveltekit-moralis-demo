import type Moralis from 'moralis/types';
import { writable } from 'svelte/store';

export const currentUser = writable<Moralis.User<Moralis.Attributes> | null>(null);
export const isInitialized = writable(false);
export const NFTS = writable<
	{
		metadata: any;
		tokenId: string;
		name: string;
		image: any;
	}[]
>(null);
