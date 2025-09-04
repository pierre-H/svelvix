import { BetterAuth, type AuthFunctions } from '@convex-dev/better-auth';
import { components, internal } from './_generated/api';
import { query, mutation } from './_generated/server';
import type { Id, DataModel } from './_generated/dataModel';
import { ConvexError } from 'convex/values';
import { customCtx, customMutation, customQuery } from 'convex-helpers/server/customFunctions';

// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions = internal.auth;

// Initialize the component
export const betterAuthComponent = new BetterAuth(components.betterAuth, {
	authFunctions
});

// These are required named exports
export const { createUser, updateUser, deleteUser, createSession } =
	betterAuthComponent.createAuthFunctions<DataModel>({
		// Must create a user and return the user id
		onCreateUser: async (ctx, user) => {
			return ctx.db.insert('users', {
				name: user.name,
				email: user.email,
				banned: Boolean(user.banned)
			});
		},

		// Delete the user when they are deleted from Better Auth
		onDeleteUser: async (ctx, userId) => {
			await ctx.db.delete(userId as Id<'users'>);
		}
	});

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		// Get user data from Better Auth - email, name, image, etc.
		const userMetadata = await betterAuthComponent.getAuthUser(ctx);
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
		const userMetadata = await betterAuthComponent.getAuthUser(ctx);

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
		const userMetadata = await betterAuthComponent.getAuthUser(ctx);

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
