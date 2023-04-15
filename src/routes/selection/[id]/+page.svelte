<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Participant } from '../../start/types';
	import { assignedAdjectivesStore, participantsStore, roomStore } from '../../stores';
	import type { PageData } from './$types';
	import AdjectiveMatrix from './AdjectiveMatrix.svelte';

	export let data: PageData;

	let initialParticipant: Participant | undefined = $participantsStore.find(
		(participant) => participant.id == data.id
	);

	let currentParticipant: Participant | undefined = $participantsStore.find(
		(participant) => participant.id == data.id
	);

	
	let remainingParticipants = $participantsStore.filter((participant) => participant.id != data.id);

	const nextParticipant = async () => {
		if (remainingParticipants.length > 0) {
			currentParticipant = remainingParticipants[0];
			remainingParticipants = remainingParticipants.filter(
				(participant) => participant.id != currentParticipant?.id
			);
		} else {
			const response = await fetch(`/api/room/${$roomStore}/participants/${data.id}/evaluation`, {
				method: 'POST',
				body: JSON.stringify({ evaluation: $assignedAdjectivesStore, participant: initialParticipant})
			});
			if (!response.ok) {
				return alert('something went wrong')
			}
			goto(`/room/${$roomStore}/participant/${data.id}/evaluation`);
		}
	};
</script>

{#key remainingParticipants}
	{#if currentParticipant}
		<AdjectiveMatrix participant={currentParticipant} />
	{/if}
{/key}
<div class="col-span-full">
	<div class="mt-2 flex items-center gap-x-3">
		<button
			type="button"
			class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
			on:click={() => nextParticipant()}
		>
		Next
		</button>
	</div>
</div>

