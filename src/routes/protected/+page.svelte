<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth.client.js';

	let { data } = $props();

	function signOut() {
		authClient.signOut().then(() => {
			goto('/sign-in');
		});
	}
</script>

<div>
	<h1>{data.greeting}</h1>
</div>

<button class="btn btn-primary" type="button" onclick={signOut}> Logout </button>
