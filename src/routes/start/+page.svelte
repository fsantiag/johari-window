<script lang="ts">
	import Tag from './Tag.svelte';
	import type { Participant } from './types';
	//@ts-ignore
	import { v4 as uuidv4 } from 'uuid';
	import { participantsStore } from '../stores';
	import { goto } from '$app/navigation';

	let participants: Participant[];
	let isDisabled: boolean = false;

	participantsStore.subscribe((value) => {
		participants = value;
	});

	const add = (target: EventTarget | null) => {
		if (participants.length < 10) {
			const input = target as HTMLInputElement;
			if (target) {
				const newParticipant: Participant = {
					id: uuidv4(),
					name: input.value
				};
				participantsStore.update((store) => [...store, newParticipant]);
			}
			input.value = '';
			isDisabled = participants.length < 2;
		} else {
			alert('The session is limited to 10 people at the same time.');
		}
	};

	const createRoom = async () => {
		const response = await fetch('/api/room', { method: 'POST', body: JSON.stringify({ users: participants }) });
		if (response.ok) {
			return goto('/room');
		}
		alert('something wrong')
	};

	const remove = (participant: Participant) => {
		const { id } = participant;
		participantsStore.update((store) => store.filter((p) => p.id !== id));
		isDisabled = participants.length < 2;
	};
</script>

<p>Enter the name of the participants of the Johari session:</p>
<input
	placeholder="enter the participant name"
	on:keydown={(e) => e.key === 'Enter' && add(e.target)}
/>
<p>Participants:</p>
{#each participants as p}
	<Tag participant={p} remove={() => remove(p)} />
{/each}

<button on:click={createRoom} disabled={isDisabled}>GO!</button>
