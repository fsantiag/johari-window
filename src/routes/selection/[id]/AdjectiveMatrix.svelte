<script lang="ts">
	import { assignedAdjectivesStore } from '../../stores';
	import { ADJECTIVES } from './adjectives';

	export let userId: string;

	let selectedAdjectives: string[] = [];

	const addAdjective = (element: HTMLElement) => {
		const adjective = element.textContent ?? 'unknown';
		selectedAdjectives.push(adjective);
		element.classList.add('bg-gray-400');
		assignedAdjectivesStore.update((store) => {
			store[userId] = selectedAdjectives;
			return store;
		});
		console.log($assignedAdjectivesStore);
	};

	const handleClick = (event: MouseEvent) => {
		const element = event.target as HTMLElement;
		addAdjective(element);
	};

	const handleSpace = (event: KeyboardEvent) => {
		if (event.key === ' ') {
			const element = event.target as HTMLElement;
			addAdjective(element);
		}
	};
</script>

<p>Your selected adjectives</p>
<p>{selectedAdjectives}</p>
<br />
<div class="grid grid-cols-2 md:grid-cols-6 gap-4">
	{#each ADJECTIVES as adjective, i}
		<div class="hover:bg-slate-500" on:click={handleClick} on:keydown={handleSpace}>
			{adjective}
		</div>
	{/each}
</div>
