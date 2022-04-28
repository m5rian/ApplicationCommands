<script>
	import Options from './optionTypes/option/Options.svelte';
	import Subcommands from './optionTypes/subcommand/Subcommands.svelte';
	import SubcommandGroups from './optionTypes/subcommandGroup/SubcommandGroups.svelte';
	import CommandSettings from './CommandSettings.svelte';

	export let slashCommand
	$:{
		slashCommand.options = slashCommand.options === undefined
			? []
			: slashCommand.options.filter(item => item !== undefined)
	}

	let showSettings = false;
	let minimize = true;
</script>

<div class="command-wrapper">
	<!-- Slash command itself -->
	<div class="command">
		<div class="info">
			<input bind:value={slashCommand.name} class="name"/>
			<input bind:value={slashCommand.description} class="description"/>
		</div>
		<div>
			<i class="fas fa-cog icon-cog" on:click={() => showSettings = true}></i>
			<CommandSettings bind:active={showSettings} bind:command={slashCommand}/>
			<i class="fas fa-trash icon-delete" on:click={() => slashCommand = undefined}></i>
		</div>
	</div>

	{#if minimize}
		<div class="center-pls">
			<i class="fa-solid fa-chevron-down" on:click={() => minimize = false}></i>
		</div>
	{:else}
		<SubcommandGroups bind:options={slashCommand.options}/>
		<Subcommands bind:options={slashCommand.options}/>
		<Options bind:options={slashCommand.options}/>
		<div class="center-pls">
			<i class="fa-solid fa-chevron-up" on:click={() => minimize = true}></i>
		</div>
	{/if}
</div>

<style>
	.center-pls {
		width: 100%;
		display: flex;
		justify-content: center;
		color: #FFFF;
	}

	.command-wrapper {
		width: 75vw;

		padding: 0.5rem;
		margin-bottom: 25px;

		background-color: #32353B;
		border-radius: 0.5rem;
	}


	.command {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>