<script lang="ts">
	import { participantsStore } from '../../stores';
	import type { PageData } from './$types';
	import AdjectiveMatrix from './AdjectiveMatrix.svelte';

	export let data: PageData;

	let currentParticipant = data.id;
	let toBeEvaluated = $participantsStore.filter((participant) => participant.id != data.id);

	const nextParticipant = () => {
		if (toBeEvaluated.length > 0) {
			currentParticipant = toBeEvaluated[0].id;
			toBeEvaluated = toBeEvaluated.filter((participant) => participant.id != currentParticipant);
		}
	};
</script>

<p>This is your id: <b>{data.id}</b></p>
<div>
	Participants:
	<ul>
		{#each $participantsStore as p}
			<li>{p.name}</li>
		{/each}
	</ul>
</div>

{#key toBeEvaluated}
	<AdjectiveMatrix userId={currentParticipant} />
{/key}
<button on:click={nextParticipant}>Next</button>
