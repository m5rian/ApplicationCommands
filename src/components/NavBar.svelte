<script>
	import {onLogout} from '../Utilities';
	import {retrieveCommands} from '../commandsManager';

	export let bot
</script>

<div class="navbar">
	<div class="bot-info">
		<img alt="" src={"https://cdn.discordapp.com/avatars/" + bot["id"] + "/" + bot["avatar"] + ".png"}/>
		<p>{bot["username"]}</p>
		<select name="scope">
			{#await retrieveCommands(bot.id)
				.then(commands => commands.map(command => command.guild_id || "global"))
				.then(scopes => new Set(scopes)) then scopes}
				{#each Array.from(scopes) as scope}
					<option value={scope}>{scope}</option>
				{/each}
			{/await}
		</select>
	</div>
	<div class="byebye">
		<i class="fas fa-sign-out-alt logout-button" on:click={onLogout}></i>
	</div>
</div>

<style>
	.navbar {
		height: 75px;
		background-color: #202225;

		display: flex;
		justify-content: space-between;
	}
	.navbar .bot-info {
		display: flex;
		align-items: center;
		gap: 15px;
	}
	.navbar div img { height: 100% }
	.byebye {
		display: flex;
		justify-content: center;
		align-items: center
	}
	.logout-button {
		color: #FFFF;
		font-size: 25px;
		margin: 15px;
	}
	.logout-button:hover { color: #7289DA }
</style>