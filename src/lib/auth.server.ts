import { redirect } from '@sveltejs/kit';

export function assertIsAuthenticated(locals: App.Locals) {
	if (!locals.user) {
		redirect(302, '/sign-in');
	}
}
