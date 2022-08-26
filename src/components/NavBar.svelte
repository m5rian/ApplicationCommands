<script>
	import {onLogout} from '../Utilities';

	export let bot
	export let commands = [];
	const scopes = new Set(commands.map(command => command.guild_id || 'global'));

	let scopeInput = '';

	function setScope(scope) {
		const queryParams = new URLSearchParams(window.location.search);
		queryParams.set('scope', scope);
		location.search = '?' + queryParams.toString();
	}
</script>

<div class="navbar">
	<div class="bot-info">
		<img alt="" src={"https://cdn.discordapp.com/avatars/" + bot["id"] + "/" + bot["avatar"] + ".png"}/>
		<p>{bot["username"]}</p>
		<div>
			<button on:click={() => setScope("global")}>Global</button>
			<div>
				<input bind:value={scopeInput} placeholder="Manage scope" type="text">
				<i class="fa-solid fa-location-arrow" on:click={() => setScope(scopeInput)}></i>
			</div>
		</div>
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