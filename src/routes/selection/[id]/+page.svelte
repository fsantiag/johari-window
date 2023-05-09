<script lang="ts">
	import { goto } from '$app/navigation';
	import type { AssignedAdjectivesMap } from '../../start/types';
	import type { PageData } from './$types';
	import AdjectiveMatrix from './AdjectiveMatrix.svelte';

	export let data: PageData;

	let initialParticipant = data.participants.find(
		(participant) => participant.id == data.participantId
	);

	let remainingParticipants = data.participants.filter(p => p.id != initialParticipant?.id);
	let evaluatedParticipant = initialParticipant;

	let selectedAdjectives: string[] = [];
	let participantAdjectives: AssignedAdjectivesMap = {}

	const nextParticipant = async () => {
		participantAdjectives[evaluatedParticipant!!.id] = selectedAdjectives
		if (remainingParticipants.length > 0) {
			evaluatedParticipant = remainingParticipants.pop();
			selectedAdjectives = [];
		} else {
			console.log(participantAdjectives);
			const response = await fetch(
				`/api/room/${data.roomId}/participants/${data.participantId}/evaluation`,
				{
					method: 'POST',
					body: JSON.stringify({
						evaluation: participantAdjectives,
						participant: initialParticipant
					})
				}
			);
			if (!response.ok) {
				return alert('something went wrong');
			}
			goto(`/room/${data.roomId}/participant/${data.participantId}/evaluation`);
		}
	};
</script>

<div class="border space-y-10 rounded-lg">
	<div class="p-8">
		{#key evaluatedParticipant}
			<AdjectiveMatrix participant={evaluatedParticipant} bind:selectedAdjectives />
		{/key}
		<div class="pt-4 col-span-full">
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
	</div>
</div>
