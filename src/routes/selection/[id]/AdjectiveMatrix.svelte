<script lang="ts">
	import type { Participant } from '../../start/types';
	import { ADJECTIVES } from './adjectives';

	export let participant: Participant | undefined;

	export let selectedAdjectives: string[] = [];

	const selectAdjective = (element: HTMLElement) => {
		const adjective = element.textContent ?? 'unknown';
		if (selectedAdjectives.includes(adjective)) {
			selectedAdjectives = selectedAdjectives.filter( item => item !== adjective)
			element.classList.remove('bg-gray-400');
		} else {
			selectedAdjectives.push(adjective);
			element.classList.add('bg-gray-400');
		}
	};

	const handleClick = (event: MouseEvent) => {
		const element = event.target as HTMLElement;
		selectAdjective(element);
	};

	const handleSpace = (event: KeyboardEvent) => {
		if (event.key === ' ') {
			const element = event.target as HTMLElement;
			selectAdjective(element);
		}
	};
</script>


		<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
			<div class="sm:col-span-4">
				<h2 class="text-base font-semibold leading-7 text-gray-900">Adjective Selection</h2>
				<div class="mt-2">
					<p class="mt-1 text-sm leading-6 text-gray-600 py-1">
						Select all adjetives that you believe it could be used to decribe <b
							>{participant?.name}</b
						>:
					</p>
					<div class="grid grid-cols-2 md:grid-cols-6 gap-4">
						{#each ADJECTIVES as adjective, i}
							<button
								class=" hover:bg-gray-400 text-sm border-2 border-gray-400 text-black py-1 px-2 rounded"
								on:click={handleClick}
								on:keydown={handleSpace}
							>
								{adjective}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
