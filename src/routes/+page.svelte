<script>
	import { enhance, applyAction } from '$app/forms';

	import Alert from './Alert.svelte';

	export let form;
</script>

<form
	method="POST"
	action="?/create"
	use:enhance={({ form }) => {
		// Before form submission to server
		return async ({ result, update }) => {
			// After form submission to server
			if (result.type === 'success') {
				form.reset();
			} else if (result.type === 'failure') {
				await applyAction(result);
			}
			update();
		};
	}}
>
	<!-- Grid -->
	<div class="grid">
		<!-- Markup example 1: input is inside label -->
		<label for="name">
			Your name *

			<input
				type="text"
				id="name"
				name="name"
				value={form?.name ?? ''}
				placeholder="Your full name"
				required
			/>
		</label>
	</div>



	<!-- Button -->
	<button type="submit">Let's speak</button>

	{#if form?.error}
		<Alert message={form?.message} />
	{/if}
</form>
