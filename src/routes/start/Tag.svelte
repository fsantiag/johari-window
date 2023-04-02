<script lang="ts">
	import type { Participant } from "./types";


    export let participant: Participant
    export let remove: () => void;
</script>
<div class="flex">
    <p>{participant.name}</p>
    <button on:click={remove}>Remove!</button>
</div>
