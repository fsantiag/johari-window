<script lang="ts">
	import Tag from './Tag.svelte';
	import type { Participant } from './types';
    //@ts-ignore
	import { v4 as uuidv4 } from 'uuid';
	import { participants } from '../stores';

	let participantsToDisplay: Participant[];

	participants.subscribe((value) => {
		participantsToDisplay = value;
	});

	const add = (target: EventTarget | null) => {
		const input = target as HTMLInputElement;
		if (target) {
			const newParticipant: Participant = {
				id: uuidv4(),
				name: input.value
			};
			participants.update((store) => [...store, newParticipant]);
		}
		input.value = '';
	};

	const remove = (participant: Participant) => {
		const { id } = participant;
        participants.update((store) => store.filter((p) => p.id !== id));
	};
</script>

<p>Enter the name of the participants of the Johari session:</p>
<input
	placeholder="enter the participant name"
	on:keydown={(e) => e.key === 'Enter' && add(e.target)}
/>
<p>Participants:</p>
{#each participantsToDisplay as p}
	<Tag participant={p} remove={() => remove(p)} />
{/each}
