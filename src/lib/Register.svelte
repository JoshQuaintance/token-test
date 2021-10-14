<script>
	import { createEventDispatcher } from 'svelte';

	// Dispatcher for future usage in /index.svelte
	const dispatch = createEventDispatcher();

	// Variables bound to respective inputs via bind:value
	let email;
	let password;
	let username;
	let error;

	const register = async () => {
		// Reset error from previous failed attempts
		error = undefined;

		// POST method to src/routes/auth/login.js endpoint
		try {
			const res = await fetch('/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					username,
					email,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.ok) {
				dispatch('success');
			} else {
				error = 'An error occured';
			}
		} catch (err) {
			console.log(err);
			error = 'An error occured';
		}
	};
</script>

<div class="w-full max-w-xs">
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="username"
				type="text"
				placeholder="Username"
				bind:value={username}
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="email"
				type="text"
				placeholder="Email"
				bind:value={email}
			/>
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
			<input
				class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				id="password"
				type="password"
				placeholder="******************"
				bind:value={password}
			/>
			<p class="text-red-500 text-xs italic">Please choose a password.</p>
		</div>
		<div class="flex items-center justify-between">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="button"
				on:click={register}
			>
				Sign In
			</button>
		</div>
	</form>
</div>

<!-- <h1>Login</h1>
<input type="email" name="email" placeholder="Enter your email" bind:value={email} />
<input type="password" name="password" placeholder="Enter your password" bind:value={password} /> -->
{#if error}
	<p>{error}</p>
{/if}
