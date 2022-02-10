import { currentUser } from '$lib/stores/currentUser';
import { status } from '$lib/stores/status';
import { serverUrl, appId } from '$lib/utils/Env';

/**
 * Ethereum, BSC, and Polygon Login
 * @param {string} provider the provider used when login. "metamask", "walletconnect"
 */
//@ts-ignore
// const useMoralis = Moralis as moralis;

export async function login(provider = 'metamask') {
	let user = Moralis.User.current();
	if (!user) {
		user = await (Moralis as any)
			.authenticate({ provider, signingMessage: 'Log in using Moralis' })
			.then((user) => {
				console.log('logged in user: ', user);
				status.update((stat) => {
					return { ...stat, user: user, isAuthenticated: true };
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
}

/**
 * Logout
 */
export async function logOut() {
	await Moralis.User.logOut();
	console.log('logged out');
	// currentUser.set(null);
	status.update((stat) => {
		return { ...stat, user: null, isAuthenticated: false };
	});
}

export const MoralisInit = async () => {
	if (typeof serverUrl === 'string' && typeof appId === 'string') {
		try {
			await Moralis.start({ appId, serverUrl });
			console.log('HEre');
			status.update((stat) => {
				return { ...stat, isInitialized: true };
			});

			try {
				await (Moralis as any).enableWeb3();
				status.update((stat) => {
					return { ...stat, isWeb3enabled: true };
				});
			} catch (e) {
				console.log(e);
				status.update((stat) => {
					return { ...stat, isWeb3enabled: false };
				});
			}
		} catch (e) {
			console.log('Problem, another problem');
			console.log(e);
		}
	}
};

export const changeChain = () => {};
