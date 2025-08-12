import { CONVEX_SITE_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

const handler: RequestHandler = async ({ params, url, request }) => {
	const nextUrl = `${CONVEX_SITE_URL}/api/auth/${params.rest + url.search}`;
	const newRequest = new Request(nextUrl, request);

	newRequest.headers.set('accept-encoding', 'application/json');

	try {
		const res = await fetch(newRequest, { method: request.method, redirect: 'manual' });

		return res;
	} catch (error) {
		console.error('aïe', {
			error,
			nextUrl,
			newRequest
		});

		return new Response('Internal Server Error', { status: 500 });
	}
};

export const GET = handler;
export const POST = handler;
