<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<p>Your room id is {data.id}</p>

{#each data.participants as participant}
	<div><a href="/selection/{participant.id}">{participant.name}</a></div>
{/each}
