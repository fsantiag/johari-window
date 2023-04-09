<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Participant } from '../../start/types';
	import { participantsStore } from '../../stores';
	import type { PageData } from './$types';
	import AdjectiveMatrix from './AdjectiveMatrix.svelte';

	export let data: PageData;

	let currentParticipant: Participant | undefined = $participantsStore.find(
		(participant) => participant.id == data.id
	);
	let remainingParticipants = $participantsStore.filter((participant) => participant.id != data.id);

	const nextParticipant = () => {
		if (remainingParticipants.length > 0) {
			currentParticipant = remainingParticipants[0];
			remainingParticipants = remainingParticipants.filter(
				(participant) => participant.id != currentParticipant?.id
			);
		} else {
			goto(`/result/${data.id}`)
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

{#key remainingParticipants}
	{#if currentParticipant}
		<AdjectiveMatrix participant={currentParticipant} />
	{/if}
{/key}
<button on:click={nextParticipant}>Next</button>
