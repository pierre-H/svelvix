import { assertIsAuthenticated } from '$lib/auth.server';

export const load = ({ locals }) => {
	assertIsAuthenticated(locals);

	return {
		greeting: `hello ${locals.user?.name || 'USER_NAME'} !`
	};
};
