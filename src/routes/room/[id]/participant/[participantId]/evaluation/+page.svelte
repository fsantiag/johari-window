<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData

    const myEvaluation = data.evaluations.map((evaluation: any) => {
        console.log(evaluation.participant.S);
    });
    const myAdjectives: string[] = []
    const recognizedAdjectives: string[] = []
    
    
</script>

<div class="p-3">
    YOUR EVALUATION
</div>
<div class="p-3">
    myself: {data.participantId}
</div>
<div class="p-3">
    Evaluations: {JSON.stringify(data.evaluations)}
</div>
