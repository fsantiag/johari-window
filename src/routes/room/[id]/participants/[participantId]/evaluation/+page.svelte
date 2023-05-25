<script lang="ts">
	import { useAdjectiveEvaluation } from '../../../../../../hooks.client';
	import type { Evaluation } from '../../../../../start/types';
	import type { PageData } from './$types';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	// Initialization for ES Users

	export let data: PageData;

	const myself = data.participantId;
	const myName = data.evaluations.find(data => data.participant.id == myself).participant.name

	let {
		recognizedByOthersAndMe,
		recognizedByMeOnly,
		recognizedByOthersOnly,
		evaluationsByParticipants,
		myEvaluations,
		allParticipants
	} = useAdjectiveEvaluation(myself, data.evaluations);

	let isFinished = data.status == 'completed' ? true : false;

	onMount(() => {
		if (!isFinished) {
			const update = setInterval(async () => {
				const response = await fetch(
					`${base}/api/room/${data.id}/participants/${data.participantId}/evaluation`
				);
				if (!response.ok) {
					console.log('something went wrong!');
				}
				const { evaluations, status } = await response.json();
				const adjectives = useAdjectiveEvaluation(myself, evaluations);
				recognizedByOthersAndMe = adjectives.recognizedByOthersAndMe;
				recognizedByMeOnly = adjectives.recognizedByMeOnly;
				recognizedByOthersOnly = adjectives.recognizedByOthersOnly;
				evaluationsByParticipants = adjectives.evaluationsByParticipants;
				myEvaluations = adjectives.myEvaluations;
				allParticipants = adjectives.allParticipants;

				if (status == 'completed') {
					clearInterval(update);
					isFinished = true;
				}
			}, 5000);
		}
	});
</script>

<div class="bg-white py-24 sm:py-32">
	<div class="flex justify-center items-center text-2xl mb-14 tracking-tight text-gray-900">
		{myName} this is your result:
	</div>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
			<div class="mx-auto flex max-w-xs flex-col gap-y-4">
				<dt class="text-base leading-7 text-gray-600">{recognizedByOthersAndMe?.join(', ')}</dt>
				<dd
					class="tooltip order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
				>
					Self Aware
				</dd>
			</div>

			<div class="mx-auto flex max-w-xs flex-col gap-y-4">
				<dt class="text-base leading-7 text-gray-600">{recognizedByMeOnly?.join(', ')}</dt>
				<dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
					Hidden Area
				</dd>
			</div>

			<div class="mx-auto flex max-w-xs flex-col gap-y-4">
				<dt class="text-base leading-7 text-gray-600">{recognizedByOthersOnly?.join(', ')}</dt>
				<dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
					Blind Spot
				</dd>
			</div>
		</dl>
		{#if isFinished}
		<div class="relative mt-14 rounded-md shadow-sm">
			<div class="text-xl font-bold tracking-tight text-gray-900">Adjectives you gave to</div>
			<div class="mt-6 border-t border-gray-100">
				<dl class="divide-y divide-gray-100">
					{#each allParticipants as participant}
							<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt class="text-sm font-medium leading-6 text-gray-900">
									{#if participant.id == myself}
										Yourself
									{:else}
										{participant.name}
									{/if}
									
								</dt>
								<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
									{myEvaluations[participant.id]}
									<!-- {evaluationByParticipant.myAdjectives.join(',')} -->
								</dd>
							</div>
					{/each}
				</dl>
			</div>
		</div>
			<div class="relative mt-14 rounded-md shadow-sm">
				<div class="text-xl font-bold tracking-tight text-gray-900">Adjectives given to you by</div>
				<div class="mt-6 border-t border-gray-100">
					<dl class="divide-y divide-gray-100">
						{#each evaluationsByParticipants as evaluationByParticipant}
							<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt class="text-sm font-medium leading-6 text-gray-900">
									{evaluationByParticipant.name}
								</dt>
								<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
									{evaluationByParticipant.myAdjectives.join(',')}
								</dd>
							</div>
						{/each}
					</dl>
				</div>
			</div>
			<div class="flex justify-center items-center mt-24">
				<p class="text-center">
					<b>The session is finished!</b>
				</p>
			</div>
		{:else}
		<div class="flex justify-center items-center mt-24">
			<div class="loader" />
		</div>
		{/if}
	</div>
</div>

<style>
	.loader {
		border: 16px solid #f3f3f3; /* Light grey */
		border-top: 16px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 64px;
		height: 64px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
