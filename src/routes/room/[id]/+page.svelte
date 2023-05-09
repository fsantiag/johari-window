<script lang="ts">
	import type { PageData } from './$types';
	import { copy } from 'svelte-copy';
	import { page } from '$app/stores';

	export let data: PageData;
	const roomUrl: string = $page.url.toString();
</script>

<div class="border p-8 rounded-lg">
	<div class="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
		<div class="w-full max-w-md space-y-8">
			<div>
				<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
					Copy and share the room link
				</h2>
				<button class="mt-2 text-sm text-gray-600" use:copy={roomUrl}>
					<div class="flex flex-nowrap">
					<span class="font-medium text-teal-600 hover:text-indigo-500">{roomUrl}</span>
					<svg
						class="h-6 w-6 text-teal-500"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<path
							d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"
						/> <line x1="8" y1="8" x2="12" y2="8" /> <line x1="8" y1="12" x2="12" y2="12" />
						<line x1="8" y1="16" x2="12" y2="16" /></svg
					>
					
				</button>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-6 py-6 lg:px-8">
		<p class="mt-1 text-center text-sm leading-6 text-gray-600 py-1">
			To start your Johari's session select your name bellow
		</p>
		<dl class="grid grid-cols-1 gap-x-8 gap-y-16 py-6 text-center lg:grid-cols-3">
			{#each data.participants as participant}
				<div class="mx-auto flex max-w-xs flex-col gap-y-4">
					<a
						class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-xl"
						href="/selection/{participant.id}"
					>
						{participant.name}
					</a>
				</div>
			{/each}
		</dl>
	</div>
</div>
