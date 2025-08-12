import { browser } from '$app/environment';
import { PUBLIC_CONVEX_API_URL } from '$env/static/public';
import { setupConvex, useConvexClient } from 'convex-svelte';
import { authClient } from './auth.client';
import { goto } from '$app/navigation';

export function initApp(
	{
		onChange
	}: {
		onChange: (isAuthenticated: boolean) => void;
	} = {
		onChange: () => {}
	}
) {
	setupConvex(PUBLIC_CONVEX_API_URL);

	const client = useConvexClient();

	if (browser) {
		client.client.setAuth(async () => {
			try {
				const token = await authClient.convex.token();

				if (!token.data?.token) {
					if (token?.error?.status === 401) {
						await authClient.signOut();
						goto('/sign-in');

						return;
					} else {
						console.log('No token', { token });
					}
				}

				return token.data?.token ?? null;
			} catch (error) {
				console.error('Error getting token', error);
				goto('/sign-in');
				return null;
			}
		}, onChange);
	}

	return client.close;
}
