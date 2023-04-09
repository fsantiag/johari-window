<script lang="ts">
	import { selectedAdjectivesStore } from '../../stores';
	import type { PageData } from './$types';

	export let data: PageData;

	let displayAdjectives: string[];

	selectedAdjectivesStore.subscribe((value) => {
		displayAdjectives = value;
	});

	const handleClick = (event: MouseEvent) => {
		const element = event.target as HTMLElement;
		addAdjective(element)
	};

	const handleSpace = (event: KeyboardEvent) => {
		if (event.key === ' ') {
			const element = event.target as HTMLElement;
			addAdjective(element);
		}
	};

	const addAdjective = (element: HTMLElement) => {
		element.classList.add('bg-gray-400');
		selectedAdjectivesStore.update((store) => {
			const adjective = element.textContent ?? 'unknown';
			if (!store.includes(adjective)) {
				store.push(adjective);
			}
			return store;
		});
	};

	const adjectives = [
		'able',
		'accepting',
		'adaptable',
		'bold',
		'brave',
		'calm',
		'caring',
		'cheerful',
		'clever',
		'complex',
		'confident',
		'dependable',
		'dignified',
		'energetic',
		'extroverted',
		'friendly',
		'giving',
		'happy',
		'helpful',
		'idealistic',
		'independent',
		'ingenious',
		'intelligent',
		'introverted',
		'kind',
		'knowledgeable',
		'logical',
		'loving',
		'mature',
		'modest',
		'nervous',
		'observant',
		'organised',
		'patient',
		'powerful',
		'proud',
		'quiet',
		'reflective',
		'relaxed',
		'religious',
		'responsive',
		'searching',
		'self',
		'self',
		'sensible',
		'sentimental',
		'shy',
		'silly',
		'spontaneous',
		'sympathetic',
		'tense',
		'trustworthy',
		'warm',
		'wise',
		'witty'
	];
</script>
<p>This is your id: <b>{data.id}</b></p>
<p>Your selected adjectives</p>
<p class="mb-3 text-gray-500 dark:text-gray-400">{displayAdjectives}</p>
<div class="grid grid-cols-2 md:grid-cols-6 gap-4">
	{#each adjectives as adjective, i}
		<div class="hover:bg-slate-500" on:click={handleClick} on:keydown={handleSpace}>
			{adjective}
		</div>
	{/each}
</div>
