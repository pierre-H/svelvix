import { PUBLIC_CONVEX_API_URL } from '$env/static/public';
import { createAuth } from '$lib/auth.server';
import { JWT_COOKIE_NAME } from '@convex-dev/better-auth/plugins';
import type { Handle } from '@sveltejs/kit';
import { createCookieGetter } from 'better-auth/cookies';
import { ConvexHttpClient } from 'convex/browser';
import { jwtDecode } from 'jwt-decode';
import { api } from '$convex/_generated/api';

const authHandle: Handle = async ({ event, resolve }) => {
	const convexClient = new ConvexHttpClient(PUBLIC_CONVEX_API_URL);

	const auth = createAuth({} as unknown);
	const createCookie = createCookieGetter(auth.options);
	const cookie = createCookie(JWT_COOKIE_NAME);

	const token = event.cookies.get(cookie.name);

	if (token) {
		const tokenDecoded = jwtDecode(token);
		const isNotExpired = tokenDecoded.exp && tokenDecoded.exp > Date.now() / 1000;

		if (isNotExpired) {
			convexClient.setAuth(token);

			const user = await convexClient.query(api.auth.getCurrentUser, {});

			if (user) {
				event.locals.user = user;
			}
		}
	}

	event.locals.convexClient = convexClient;

	return await resolve(event);
};

export const handle = authHandle;
