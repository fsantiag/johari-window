<script lang="ts">
	import { participantsStore, roomStore } from '../../stores';
	import type { PageData } from './$types';

	export let data: PageData;

	participantsStore.update(() => [...data.participants]);
	roomStore.update(() => data.roomId);
</script>

<div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				This is your room id
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				<span class="font-medium text-teal-600 hover:text-indigo-500">/room/{data.id}</span>
			</p>
		</div>
	</div>
</div>

<div class="mx-auto max-w-7xl px-6 lg:px-8">
	<dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
		{#each data.participants as participant}
			<div class="mx-auto flex max-w-xs flex-col gap-y-4">
				<a class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-xl"
					href="/selection/{participant.id}">
					{participant.name}
				</a>
			</div>
		{/each}
	</dl>
</div>

