import { createAuthClient } from 'better-auth/react';
import { convexClient } from '@convex-dev/better-auth/client/plugins';
import { PUBLIC_SITE_URL } from '$env/static/public';

export const authClient = createAuthClient({
	baseURL: PUBLIC_SITE_URL,
	plugins: [convexClient()]
});
