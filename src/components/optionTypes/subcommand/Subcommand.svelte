<script>
	import Option from '../option/Option.svelte';
	import {getExampleOption} from '../../../Templates';
	import OptionPreview from '../../utils/OptionPreview.svelte';

	export let subcommand;
	$: {
		subcommand.options = subcommand.options === undefined
			? []
			: subcommand.options.filter(item => item !== undefined)
	}
</script>

<div class="option-wrapper">

	<!-- Subcommand -->
	<div class="item">
		<OptionPreview bind:description={subcommand.description} bind:name={subcommand.name} colour="#FBC21D" icon="fa-folder"/>
		<div class="buttons">
			<i class="fas fa-plus-square icon-add" on:click={() => subcommand.options = [...subcommand.options, getExampleOption()]}></i>
			<i class="fas fa-trash icon-delete" on:click={() => subcommand = undefined}></i>
		</div>
	</div>

	{#each subcommand.options as option}
		{#if option.type > 2}
			<Option bind:option/>
		{/if}
	{/each}
</div>

<style>
	.option-wrapper { margin-left: 15px }

	.item {
		background-color: #2F3136;
		padding: 0.5rem;
		border-radius: 0.75rem;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.buttons { display: flex; gap: 10px }

	.name { display: flex; gap: 10px }
	.name > input { transition: color cubic-bezier(.67, .01, .58, .99) 0.25s }
	.name:hover > input { color: #FAA419 }
</style>