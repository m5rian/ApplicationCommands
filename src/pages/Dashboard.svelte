<script>
	import {SvelteToast} from '@zerodevx/svelte-toast'
	import {getCookie} from '../Utilities';
	import Command from '../components/Command.svelte';
	import NavBar from '../components/NavBar.svelte';
	import Loading from '../components/Loading.svelte';
	import Popup from '../components/Popup.svelte';
	import {retrieveCommands, saveCommands} from '../commandsManager';

	if (getCookie('token') == null) {
		window.location.href = window.location.origin + '/login';
	}

	let scope = new URLSearchParams(window.location.search).get('scope') || 'global';

	let bot;
	let initialCommands = [];
	let commands = [];
	$: commands = commands
		.filter(command => command !== undefined)
		.filter(command => {
			if (scope === 'global') return command.guild_id === undefined;
			else return command.guild_id === scope;
		});

	let showJson = false;
	let showLocalizationsInput = false;
	let showCommandsInput = false;

	async function loadData() {
		const urlBot = 'http://' + window.location.hostname + ':8182/bot'
		bot = await (await fetch(urlBot, {headers: {token: getCookie('token'),}})).json()

		initialCommands = await retrieveCommands(bot.id, scope);
		commands = JSON.parse(JSON.stringify(initialCommands));
		return true
	}

	export async function addCommand() {
		const commandTemplate = {
			name: 'command',
			description: 'A small command description',
			options: []
		};
		if (scope !== "global") commandTemplate.guild_id = scope;

		commands = [...commands, commandTemplate];
		await saveSlashCommands();
	}

	async function saveSlashCommands() {
		await saveCommands(bot.id, scope, commands)
		window.location.reload();
	}



	async function applySlashCommands() {
		const data = document.querySelector('#commands-input').value;
		const importedCommands = JSON.parse(data)
		for (let command of importedCommands) {
			delete command.id;
			delete command.application_id;
		}
		initialCommands = importedCommands;
		await saveSlashCommands()
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(JSON.stringify(commands))
	}

	function loadFromClipboard() {
		navigator.clipboard.readText().then(data => initialCommands = JSON.parse(data))
	}

	function saveLocalizations() {
		const data = document.querySelector('#localizations-input').value
		const internationalization = JSON.parse(data)
		for (let i = 0; i < commands.length; i++) {
			const command = commands[i]

			const lang = internationalization.find(it => it.name === command.name)
			if (lang === undefined) continue;
			cleanTranslations(lang)
			namesToLowerCase(lang)
			console.log(lang)
			applyInternationalization(command, lang)
			commands[i] = command
		}
		//saveSlashCommands()
	}

	function applyInternationalization(object, lang) {
		if (document.querySelector('#overwrite-descriptions').checked) {
			object.description = lang.description;
		}

		object.name_localizations = lang.name_localizations
		object.description_localizations = lang.description_localizations
		if (object.options) {
			for (let option of object.options) {
				const optionLang = lang.options.find(it => it.name === option.name)
				if (optionLang === undefined) continue;
				applyInternationalization(option, optionLang)
			}
		}
	}

	function namesToLowerCase(obj) {
		Object.keys(obj).forEach(k => {
			if (Object.prototype.toString.call(obj[k]) === '[object Array]') obj[k] = obj[k].map(it => namesToLowerCase(it))
			else if (obj[k] && typeof obj[k] === 'object') {
				if (k.startsWith('name')) {
					const languages = Object.keys(obj[k])
					for (let language of languages) {
						obj[k][language] = obj[k][language].toLowerCase()
					}
				} else namesToLowerCase(obj[k])
			}
		})
		return obj;
	}

	function cleanTranslations(obj) {
		Object.keys(obj).forEach(k => {
			if (Object.prototype.toString.call(obj[k]) === '[object Array]') obj[k] = obj[k].map(it => cleanTranslations(it))
			else if (obj[k] && typeof obj[k] === 'object') {

				if (k.endsWith('localizations')) {
					const languages = Object.keys(obj[k]);
					for (let language of languages) {
						if (obj[k][language].replaceAll(/\s*/g, '').length === 0) {
							delete obj[k][language];
						}
					}
				} else cleanTranslations(obj[k])

			}
		})
		return obj;
	}

	function copyLocalizations() {
		const langs = []
		for (let command of commands) {
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
			<pre class="json">{JSON.stringify(commands, null, 4)}</pre>
		</Popup>
		<Popup bind:active={showLocalizationsInput} onClose={saveLocalizations}>
			<p>
				<input checked id="overwrite-descriptions" type="checkbox">
				Overwrite default descriptions
			</p>
			<textarea id="localizations-input"></textarea>
		</Popup>
		<Popup bind:active={showCommandsInput} onClose={applySlashCommands}>
			<textarea id="commands-input"></textarea>
		</Popup>

		<SvelteToast/>
		<NavBar {bot} commands={commands}/>

		<div class="page-content">
			<div class="slashCommands-wrapper">
				{#each commands as slashCommand}
					<Command bind:slashCommand/>
				{/each}
			</div>

			<div class="command-manager">
				<i class="fas fa-plus-square" on:click={addCommand}></i>
				<button on:click={() => showJson = true}>Show json</button>
				<button on:click={copyToClipboard}>Copy to clipboard</button>
				<button on:click={() => showCommandsInput = true}>Load from clipboard</button>
				<button on:click={copyLocalizations}>Copy localizations</button>
				<button on:click={() => showLocalizationsInput = true}>Load localizations</button>
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

	#localizations-input, #commands-input {
		width: 95%;
		min-height: 95%;
		resize: vertical;
	}
</style>
