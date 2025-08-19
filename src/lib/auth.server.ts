import { convexAdapter } from '@convex-dev/better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import { betterAuth } from 'better-auth';
import { betterAuthComponent } from '$convex/auth';
import { type GenericCtx } from '$convex/_generated/server';
import { redirect } from '@sveltejs/kit';

// You'll want to replace this with an environment variable

export const createAuth = (ctx: GenericCtx) =>
	// Configure your Better Auth instance here
	betterAuth({
		trustedOrigins: [process.env.PUBLIC_SITE_URL || ''],
		database: convexAdapter(ctx, betterAuthComponent),
		secret: process.env.BETTER_AUTH_SECRET,

		// Simple non-verified email/password to get started
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false
		},
		plugins: [
			// The Convex plugin is required
			convex()
		]
	});

export function assertIsAuthenticated(locals: App.Locals) {
	if (!locals.user) {
		redirect(302, '/sign-in');
	}
}
