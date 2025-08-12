import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
	users: defineTable({
		email: v.string(),
		name: v.string(),
		banned: v.boolean()
	}).index('byEmail', ['email'])
});

export default schema;
