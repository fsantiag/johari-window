<script lang="ts">
	import { useAdjectiveEvaluation } from '../../../../../../hooks.client';
	import type { Evaluation } from '../../../../../start/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const evaluations: Evaluation[] = data.evaluations;
    const myself = data.participantId
    
    const {
        recognizedByOthersAndMe, 
        recognizedByMeOnly, 
        recognizedByOthersOnly
    } = useAdjectiveEvaluation(myself, evaluations);
</script>
<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base leading-7 text-gray-600">{recognizedByOthersAndMe.join(", ")}</dt>
		<dd class="tooltip order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Self Aware</dd>
      </div>

      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base leading-7 text-gray-600">{recognizedByMeOnly.join(", ")}</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Hidden Area</dd>
      </div>

      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base leading-7 text-gray-600">{recognizedByOthersOnly.join(", ")}</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Blind Spot</dd>
      </div>
    </dl>
  </div>
</div>