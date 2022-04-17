<script>
	import {SvelteToast, toast} from '@zerodevx/svelte-toast'
	import {getCookie} from '../Utilities';
	import Command from '../components/Command.svelte';
	import NavBar from '../components/NavBar.svelte';
	import Loading from '../components/Loading.svelte';
	import Popup from '../components/Popup.svelte';

	if (getCookie('token') == null) {
		window.location.href = window.location.origin + '/login';
	}

	let bot;
	let slashCommands = [];
	let showJson = false;
	$: slashCommands = slashCommands.filter(element => element !== undefined)

	async function loadData() {
		const urlBot = 'http://' + window.location.hostname + ':8182/bot'
		bot = await (await fetch(urlBot, {headers: {token: getCookie('token'),}})).json()

		const url = 'http://' + window.location.hostname + ':8182/retrieve'
		const response = await fetch(url, {
			headers: {
				token: getCookie('token'),
				id: bot['id']
			}
		})
		slashCommands = await response.json()

		return true
	}

	export function addCommand() {
		const commandTemplate = {
			name: 'command',
			description: 'I can do cool stuff',
			options: []
		}
		createSlashCommand(commandTemplate)
	}

	async function createSlashCommand(command) {
		const body = JSON.stringify(command)
		const url = 'http://' + window.location.hostname + ':8182/create'
		const response = await (await fetch(url, {
			method: 'POST',
			headers: {
				token: getCookie('token'),
				id: bot.id,
				json: body
			}
		})).json()
		if (response.retry_after !== undefined) {
			toast.push(response.message)
		} else window.location.reload(true);
	}

	async function saveSlashCommands() {
		const url = 'http://' + window.location.hostname + ':8182/update'
		const res = await (await fetch(url, {
			method: 'POST',
			headers: {
				token: getCookie('token'),
				id: bot.id,
			},
			body: encodeURI(JSON.stringify(slashCommands, null))
		}))
		window.location.reload(true);
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(JSON.stringify(slashCommands))
	}

	function loadFromClipboard() {
		navigator.clipboard.readText().then(data => {
			slashCommands = JSON.parse(data)
		})
	}

	function loadLocalizations() {
		navigator.clipboard.readText().then(data => {
			const langs = JSON.parse(data)
			for (let i = 0; i < slashCommands.length; i++) {
				const command = slashCommands[i]
				const lang = langs.find(it => it.name === command.name)
				slashCommands[i] = Object.assign(command, lang)
			}
			saveSlashCommands()
		})
	}

	function copyLocalizations() {
		const langs = []
		for (let command of slashCommands) {
			const lang = {}
			lang.name = command.name
			lang.name_localizations = command.name_localizations ? command.name_localizations : {}
			lang.description = command.description
			lang.description_localizations = command.description_localizations ? command.description_localizations : {}
			if (command.options !== undefined) lang.options = loadOptions(command)
			langs.push(lang)
		}
		navigator.clipboard.writeText(JSON.stringify(langs))
	}

	function loadOptions(parent) {
		const langOptions = []
		for (let option of parent.options) {
			const langOption = {}
			langOption.name = option.name
			langOption.name_localizations = option.name_localizations ? option.name_localizations : {}
			langOption.description = option.description
			langOption.description_localizations = option.description_localizations ? option.description_localizations : {}
			if (option.options !== undefined) langOption.options = loadOptions(option)
			langOptions.push(langOption)
		}
		return langOptions
	}
</script>

<section>
	{#await loadData()}
		<Loading/>
	{:then _unused}
		<Popup bind:active={showJson}>
			<pre class="json">{JSON.stringify(slashCommands, null, 4)}</pre>
		</Popup>

		<SvelteToast/>
		<NavBar {bot}/>

		<div class="page-content">
			<div class="slashCommands-wrapper">
				{#each slashCommands as slashCommand}
					<Command bind:slashCommand/>
				{/each}
			</div>

			<div class="command-manager">
				<i class="fas fa-plus-square" on:click={addCommand}></i>
				<button on:click={() => showJson = true}>Show json</button>
				<button on:click={copyToClipboard}>Copy to clipboard</button>
				<button on:click={loadFromClipboard}>Load from clipboard</button>
				<button on:click={copyLocalizations}>Copy localizations</button>
				<button on:click={loadLocalizations}>Load localizations from clipboard</button>
				<button on:click={saveSlashCommands}>Save commands</button>
			</div>
		</div>
	{/await}
</section>

<style>
	.json {
		font-size: 1rem;
		color: #FFFF;
	}

	.page-content {
		min-height: calc(100vh - 75px);

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	/* Slash commands */
	.slashCommands-wrapper {
		margin-top: 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Command settings */
	.command-manager {
		margin: 15px;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
	}
	.command-manager i {
		color: #FFFF;
		font-size: 2rem;
	}
	.command-manager i:hover {
		color: #7289DA;
	}
	.command-manager button {
		background-color: #7289DA;
		border: none;
		color: #FFFFFF;
		padding: 0.75rem;
		border-radius: 0.5rem;
	}
	.command-manager button:hover { cursor: pointer; }
	section {
		width: 100%;
		height: 100vh;
	}
</style>
