<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { authClient } from '$lib/auth.client.js';

	let { data } = $props();

	let email = $state('');
	let password = $state('');

	function handleSubmit(event: Event) {
		event.preventDefault();

		authClient.signIn
			.email(
				{
					email,
					password,
					callbackURL: `${PUBLIC_SITE_URL}/protected`
				},
				{
					onError: (ctx) => {
						window.alert(ctx.error.message);
					}
				}
			)
			.then(({ data }) => {
				if (data?.url) {
					goto(data.url);
				} else {
					goto('/');
				}
			});
	}
</script>

<div>
	<h1>{data.title}</h1>

	<form onsubmit={handleSubmit}>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Email</legend>
			<input type="email" class="validator input" autocomplete="email" bind:value={email} />
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Passowrd</legend>
			<input
				type="password"
				class="validator input"
				autocomplete="current-password"
				bind:value={password}
				minlength="8"
				maxlength="300"
			/>
		</fieldset>

		<button type="submit" class="btn btn-primary">Login</button>
	</form>
</div>
