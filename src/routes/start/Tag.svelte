<script lang="ts">
	import type { Participant } from './types';

	export let participant: Participant;
	export let remove: () => void;
</script>

<li class="flex items-center justify-between py-1 pr-4">
	<div class="flex w-0 flex-1 items-center">
		<p class="mt-1 text-sm leading-6 text-gray-600">
			{participant.name}
		</p>
	</div>
	<div class="ml-4 flex-shrink-0">
		<button type="button" class="text-sm text-teal-600 hover:text-indigo-500" on:click={remove}>
			remove
		</button>
	</div>
</li>
