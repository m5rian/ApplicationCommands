<script>
	import Popup from '../../Popup.svelte';
	import {getExampleChoice} from '../../../Templates';

	export let option;
	export let active;

	if (option.choices === undefined) option.choices = []

	function addChoice() {
		option.choices = [...option.choices, getExampleChoice()]
	}
</script>

<Popup bind:active>
	<div class="setting">
		<p>Type</p>
		<select id="type-dropdown" on:change={event => option.type = parseInt(event.target.value) }>
			<option selected={option.type === 3} value="3">String</option>
			<option selected={option.type === 4} value="4">Integer</option>
			<option selected={option.type === 5} value="5">Boolean</option>
			<option selected={option.type === 6} value="6">User</option>
			<option selected={option.type === 7} value="7">Channel</option>
			<option selected={option.type === 8} value="8">Role</option>
			<option selected={option.type === 9} value="9">Mentionable</option>
			<option selected={option.type === 10} value="10">Number</option>
		</select>
	</div>

	<div class="setting">
		<p>Optional</p>
		<input checked={!option.required} id="optional" on:click={event => option.required = !event.target.checked} type="checkbox">
	</div>

	{#if option.type === 3 || option.type === 4 || option.type === 10}
		<div>
			<p>Autocomplete</p>
			<input checked={option.autocomplete} id="autocomplete" on:click={event => option.autocomplete = event.target.checked} type="checkbox">
		</div>
	{/if}

	<div>
		<div class="setting">
			<p>Choices</p>
			<i class="fas fa-plus-square icon-add" on:click={addChoice}></i>
		</div>
		<div class="choices">
			{#each option.choices as choice}
				<div class="choice">
					{#if option.type === 3}
						<input bind:value={choice.name}>
						<input bind:value={choice.value}>
						{:else}
						<input type="number" bind:value={choice.name}>
						<input type="number" bind:value={choice.value}>
					{/if}
					<i class="fas fa-trash icon-delete" on:click={() => option.choices = option.choices.filter(c => c !== choice)}></i>
				</div>
			{/each}
		</div>
	</div>
</Popup>

<style>
	.setting {
		display: flex;
		align-items: center;
	}

	select {
		/* Remove default styling */
		border: none;
		appearance: none;
		outline: none;

		background-color: #18191C;
		color: #FFFFFF;
		border-radius: 0.5rem;
		width: 5rem;
		height: 1.5rem;

		margin-left: 1rem;
	}

	.choices {
		display: flex;
		gap: 5px;
		flex-direction: column;
	}

	.choice {
		padding: 0.75em;
		background-color: #18191C;
		border-radius: 0.5rem
	}
	.choice:not(:first-child) { margin: 2px; border-top: 1px solid #2F3136 }
</style>