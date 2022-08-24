<script>
	import Popup from './Popup.svelte';

	export let command;
	export let active;

	let permissions = {
		'CREATE_INSTANT_INVITE': 0x0000000000000001,
		'KICK_MEMBERS': 0x0000000000000002,
		'BAN_MEMBERS': 0x0000000000000004,
		'ADMINISTRATOR': 0x0000000000000008,
		'MANAGE_CHANNELS': 0x0000000000000010,
		'MANAGE_GUILD': 0x0000000000000020,
		'ADD_REACTIONS': 0x0000000000000040,
		'VIEW_AUDIT_LOG': 0x0000000000000080,
		'PRIORITY_SPEAKER': 0x0000000000000100,
		'STREAM': 0x0000000000000200,
		'VIEW_CHANNEL': 0x0000000000000400,
		'SEND_MESSAGES': 0x0000000000000800,
		'SEND_TTS_MESSAGES': 0x0000000000001000,
		'MANAGE_MESSAGES': 0x0000000000002000,
		'EMBED_LINKS': 0x0000000000004000,
		'ATTACH_FILES': 0x0000000000008000,
		'READ_MESSAGE_HISTORY': 0x0000000000010000,
		'MENTION_EVERYONE': 0x0000000000020000,
		'USE_EXTERNAL_EMOJIS': 0x0000000000040000,
		'VIEW_GUILD_INSIGHTS': 0x0000000000080000,
		'CONNECT': 0x0000000000100000,
		'SPEAK': 0x0000000000200000,
		'MUTE_MEMBERS': 0x0000000000400000,
		'DEAFEN_MEMBERS': 0x0000000000800000,
		'MOVE_MEMBERS': 0x0000000001000000,
		'USE_VAD': 0x0000000002000000,
		'CHANGE_NICKNAME': 0x0000000004000000,
		'MANAGE_NICKNAMES': 0x0000000008000000,
		'MANAGE_ROLES': 0x0000000010000000,
		'MANAGE_WEBHOOKS': 0x0000000020000000,
		'MANAGE_EMOJIS_AND_STICKERS': 0x0000000040000000,
		'USE_APPLICATION_COMMANDS': 0x0000000080000000,
		'REQUEST_TO_SPEAK': 0x0000000100000000,
		'MANAGE_EVENTS': 0x0000000200000000,
		'MANAGE_THREADS': 0x0000000400000000,
		'CREATE_PUBLIC_THREADS': 0x0000000800000000,
		'CREATE_PRIVATE_THREADS': 0x0000001000000000,
		'USE_EXTERNAL_STICKERS': 0x0000002000000000,
		'SEND_MESSAGES_IN_THREADS': 0x0000004000000000,
		'USE_EMBEDDED_ACTIVITIES': 0x0000008000000000,
		'MODERATE_MEMBERS': 0x0000010000000000,
	}

	function isRequired(permission) {
		if (command.default_member_permissions == null) return false;
		else return (command.default_member_permissions & permissions[permission]) === permissions[permission];
	}

	function managePermission(permission, enabled) {
		if (enabled) {
			if (command.default_member_permissions == null) command.default_member_permissions = permission
			else command.default_member_permissions = command.default_member_permissions | permission
		} else {
			if (command.default_member_permissions === permission) command.default_member_permissions = null
			else command.default_member_permissions = command.default_member_permissions ^ permission
		}
	}
</script>

<Popup bind:active>
	<div class="container">

		<div class="setting">
			<p>Dms</p>
			<input checked={command.dm_permission} on:click={event => command.dm_permission = event.target.checked} type="checkbox">
		</div>

		<div class="setting">
			<p>Guild specific</p>
			<input on:input={event => {
				const value = event.target.value;
				if (value.length === 0) command.guild_id = null;
				else command.guild_id = value;
			}}  placeholder="Type in guild id - empty for global command" type="text">
		</div>

		<div>
			<p class="chunky">Required permissions</p>
			{#each Object.keys(permissions) as permission}
				<div class="setting">
					<p>{permission.toLowerCase().replaceAll("_", " ")}</p>
					{#if isRequired(permission)}
						<input checked on:click={event => managePermission(permissions[permission],event.target.checked) } type="checkbox">
					{:else}
						<input on:click={event => managePermission(permissions[permission],event.target.checked) } type="checkbox">
					{/if}
				</div>
			{/each}
		</div>

	</div>
</Popup>

<style>
	.chunky {
		font-size: 2em;
		font-weight: bold;
		white-space: nowrap;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
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
</style>