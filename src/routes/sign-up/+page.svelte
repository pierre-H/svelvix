<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { authClient } from '$lib/auth.client.js';

	let { data } = $props();

	let name = $state('');
	let email = $state('');
	let password = $state('');

	function handleSubmit(event: Event) {
		event.preventDefault();

		authClient.signUp
			.email(
				{
					name,
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
			.then(() => {
				goto('/protected');
			});
	}
</script>

<div>
	<h1>{data.title}</h1>

	<form onsubmit={handleSubmit}>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Name</legend>
			<input type="text" class="validator input" autocomplete="name" bind:value={name} />
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Email</legend>
			<input type="email" class="validator input" autocomplete="email" bind:value={email} />
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Password</legend>
			<input
				type="password"
				class="validator input"
				autocomplete="new-password"
				bind:value={password}
				minlength="8"
				maxlength="300"
			/>
		</fieldset>

		<button type="submit" class="btn btn-primary">Sign In</button>
	</form>
</div>
