// See https://svelte.dev/docs/kit/types#app.d.ts

import type { ConvexHttpClient } from 'convex/browser';
import type { FunctionReturnType } from 'convex/server';
import type { api } from '$convex/_generated/api';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			convexClient: ConvexHttpClient;
			user?: FunctionReturnType<typeof api.auth.getCurrentUser>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
