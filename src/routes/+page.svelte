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

		<label for="email">
			Your Email *
			<input
				type="email"
				id="email"
				name="email"
				value={form?.email ?? ''}
				placeholder="you@company.com"
				required
			/>
		</label>

		<label for="mobile" class="block mb-2 font-medium text-gray-900 dark:text-gray-300"
			>Your Mobile
			<input
				type="mobile"
				id="mobile"
				name="mobile"
				value={form?.mobile ?? ''}
				placeholder="With + country code"
			/>
		</label>

		<label for="organisation" class="block mb-2 font-medium text-gray-900 dark:text-gray-300"
			>Your Company Name *
			<input
				type="organisation"
				id="organisation"
				name="organisation"
				value={form?.organisation ?? ''}
				placeholder="Or are you a single freelancer?"
				required
			/>
		</label>
	</div>

	<!-- Markup example 2: input is after label -->
	<label for="messageText">Your message</label>
	<textarea id="messageText" name="messageText" placeholder="Leave a comment...">
		{form?.messageText ?? ''}
	</textarea>

	<!-- Button -->
	<button type="submit">Let's speak</button>

	{#if form?.error}
		<Alert message={form?.message} />
	{/if}
</form>
