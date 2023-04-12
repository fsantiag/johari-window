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

<div class="p-3">YOUR EVALUATION</div>
<div class="p-3">
	myself: {data.participantId}
</div>
<div class="p-3">
	Recoginized by others and me: {JSON.stringify(recognizedByOthersAndMe)}
</div>
<div class="p-3">
	Recoginized by me only: {JSON.stringify(recognizedByMeOnly)}
</div>
<div class="p-3">
	Recoginized by others only: {JSON.stringify(recognizedByOthersOnly)}
</div>