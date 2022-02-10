import type Moralis from 'moralis/types';
import { writable } from 'svelte/store';

interface statusType {
	isInitialized: boolean;
	isAuthenticated: boolean;
	user: Moralis.User<Moralis.Attributes> | null;
	Account: string | null;
	chainId: string | null;
	isWeb3enabled: boolean;
}

export const status = writable<statusType>({
	isInitialized: false,
	isAuthenticated: false,
	user: null,
	Account: null,
	chainId: null,
	isWeb3enabled: false
});
