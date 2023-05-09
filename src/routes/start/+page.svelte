<script lang="ts">
	import Tag from './Tag.svelte';
	import type { Participant } from './types';
	//@ts-ignore
	import { v4 as uuidv4 } from 'uuid';
	import { participantsStore } from '../stores';
	import { goto } from '$app/navigation';

	let participants: Participant[] = [];
	let isDisabled: boolean = false;

	let participantName = '';

	const addParticipant = () => {
		if (participants.length < 10) {
			const newParticipant: Participant = {
				id: uuidv4(),
				name: participantName
			};
			participants = [...participants, newParticipant];
			participantName = '';
			isDisabled = participants.length < 2;
		} else {
			alert('The session is limited to 10 people at the same time.');
		}
	};

	const createRoom = async () => {
		const response = await fetch('/api/room', {
			method: 'POST',
			body: JSON.stringify({ users: participants })
		});
		const { id } = await response.json();
		if (response.ok) {
			return goto(`/room/${id}`);
		}
		alert('something wrong');
	};

	const remove = (participant: Participant) => {
		const { id } = participant;
		participantsStore.update((store) => store.filter((p) => p.id !== id));
		isDisabled = participants.length < 2;
	};
</script>

<div class="space-y-10">
	<div class="border p-8 rounded-lg">
		<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
			<div class="sm:col-span-4">
				<h2 class="text-base font-semibold leading-7 text-gray-900">Johari Window Setup</h2>
				<div class="mt-2">
					<p class="mt-1 text-sm leading-6 text-gray-600 py-1">
						Enter the name of all the participants of the Johari session:
					</p>
					<input
						class="text-sm block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Enter participant name"
						bind:value={participantName}
						on:keydown={(e) => e.key === 'Enter' && addParticipant()}
					/>
				</div>
			</div>

			<div class="col-span-full">
				<label for="participant" class="block text-sm font-medium leading-6 text-gray-900">
					Participants:
				</label>
				<div class="mt-2">
					{#if participants.length > 0}
						{#each participants as p}
							<Tag participant={p} remove={() => remove(p)} />
						{/each}
					{:else}
						<p class="mt-1 text-sm leading-6 text-gray-600">List is empty!</p>
					{/if}
				</div>
			</div>
			<div class="col-span-full">
				<div class="mt-2 flex items-center gap-x-3">
					<button
						type="button"
						class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
						on:click={createRoom}
						disabled={isDisabled}
					>
						Let's start!
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
