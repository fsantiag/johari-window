<script lang="ts">
	import { participantsStore } from '../../stores';
	import type { PageData } from './$types';

	export let data: PageData;

	participantsStore.update(() => [...data.participants]);
</script>

<p>Your room id is {data.id}</p>

{#each data.participants as participant}
	<div><a href="/selection/{participant.id}">{participant.name}</a></div>
{/each}
