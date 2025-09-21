import { AuthFunctions, createClient } from '@convex-dev/better-auth';
import { betterAuth } from 'better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import { components, internal } from './_generated/api';
import { query, mutation } from './_generated/server';
import type { Id, DataModel, GenericCtx } from './_generated/dataModel';
import { ConvexError } from 'convex/values';
import { customCtx, customMutation, customQuery } from 'convex-helpers/server/customFunctions';
import authSchema from './betterAuth/schema';

// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions = internal.auth;

// Initialize the component
export const authComponent = createClient<DataModel>(components.betterAuth, {
	authFunctions,
	triggers: {
		user: {
			onCreate: async (ctx, authUser) => {
				// Any `onCreateUser` logic should be moved here
				const userId = await ctx.db.insert('users', {
					name: authUser.name,
					email: authUser.email
				});
				// Instead of returning the user id, we set it to the component
				// user table manually. This is no longer required behavior, but
				// is necessary when migrating from previous versions to avoid
				// a required database migration.
				// This helper method exists solely to facilitate this migration.
				await authComponent.setUserId(ctx, authUser._id, userId);
			},
			onUpdate: async () => {
				// Any `onUpdateUser` logic should be moved here
			},
			onDelete: async (ctx, authUser) => {
				await ctx.db.delete(authUser.userId as Id<'users'>);
			}
		}
	},
	local: {
		schema: authSchema
	}
});

// These will be used in the next step
export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

export const createAuth = (
	ctx: GenericCtx<DataModel>,
	{ optionsOnly } = { optionsOnly: false }
) => {
	return betterAuth({
		baseURL: process.env.CONVEX_SITE_URL || '',
		trustedOrigins: [process.env.CONVEX_SITE_URL || ''],
		database: authComponent.adapter(ctx),
		secret: process.env.BETTER_AUTH_SECRET,

		// Simple non-verified email/password to get started
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false
		},
		plugins: [
			// The Convex plugin is required
			convex()
		],
		// When createAuth is called just to generate options, we don't want to
		// log anything
		logger: {
			disabled: optionsOnly
		}
	});
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		// Get user data from Better Auth - email, name, image, etc.
		const userMetadata = await authComponent.safeGetAuthUser(ctx);
		if (!userMetadata) {
			return null;
		}
		// Get user data from your application's database
		// (skip this if you have no fields in your users table schema)
		const user = await ctx.db.get(userMetadata.userId as Id<'users'>);
		return {
			...user,
			...userMetadata
		};
	}
});

export const authQuery = customQuery(
	query,
	customCtx(async (ctx) => {
		const userMetadata = await authComponent.safeGetAuthUser(ctx);

		if (!userMetadata) {
			throw new ConvexError('Not authenticated');
		}

		const userData = await ctx.db.get(userMetadata.userId as Id<'users'>);
		if (!userData) {
			throw new ConvexError('User not found');
		}

		return {
			user: userData
		};
	})
);

export const authMutation = customMutation(
	mutation,
	customCtx(async (ctx) => {
		const userMetadata = await authComponent.safeGetAuthUser(ctx);

		if (!userMetadata) {
			throw new ConvexError('Not authenticated');
		}

		const userData = await ctx.db.get(userMetadata.userId as Id<'users'>);
		if (!userData) {
			throw new ConvexError('User not found');
		}

		return {
			user: userData
		};
	})
);
