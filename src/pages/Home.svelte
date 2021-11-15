<script>
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import {deleteCookie, getCookie} from "../Utilities";
    import Command from "../components/Command.svelte";

    const flipDurationMs = 300;

    function handleDndConsider(e) {
        slashCommands = e.detail.items
    }

    function handleDndFinalize(e) {
        slashCommands = e.detail.items
        console.log(slashCommands)
    }


    if (getCookie("token") == null) {
        window.location.href = window.location.origin + "/login";
    }

    /**
     * Logs the user out.
     */
    function onLogout() {
        deleteCookie("token");
        window.location.reload(false);
    }


    let bot;
    let slashCommands = [];

    async function loadData() {
        bot = await (await fetch("https://discord.com/api/v6/users/@me", {headers: {Authorization: "Bot " + getCookie("token")}})).json()

        const url = window.location.protocol + "//" + window.location.hostname + ":8081/retrieve"
        slashCommands = await (await fetch(url, {
            headers: {
                token: getCookie("token"),
                id: bot["id"]
            }
        })).json()

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
        console.log(body);
        const url = window.location.protocol + "//" + window.location.hostname + ":8081/create"
        const response = await (await fetch(url, {
            method: "POST",
            headers: {
                token: getCookie("token"),
                id: bot.id,
                json: body
            }
        })).json()
        console.log(response);
        window.location.reload(true);
    }

    function guidGenerator() {
        const S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }


    export async function saveSlashCommands(command) {
        const url = window.location.protocol + "//" + window.location.hostname + ":8081/update"
        const response = await (await fetch(url, {
            headers: {
                token: getCookie("token"),
                id: bot["id"],
                slashCommands: JSON.stringify(command, null)
            }
        })).json()
        console.log(response);
        window.location.reload(true);
    }
</script>

<section>
    {#await loadData()}
        <div class="loading">
            <i class="fas fa-spinner spinner"></i>
        </div>
    {:then _unused}
        <div class="navbar">
            <div class="bot-info">
                <img src={"https://cdn.discordapp.com/avatars/" + bot["id"] + "/" + bot["avatar"] + ".png"} alt=""/>
                <p>{bot["username"]}</p>
            </div>
            <div class="byebye">
                <i class="fas fa-sign-out-alt logout-button" on:click={onLogout}></i>
            </div>
        </div>

        <div class="slashCommands-wrapper"
             use:dndzone="{{items: slashCommands, dropFromOthersDisabled: true, flipDurationMs: 500, morphDisabled: true}}"
             on:consider="{handleDndConsider}"
             on:finalize="{handleDndFinalize}">
            {#each slashCommands as slashCommand (slashCommand.id)}
                <div animate:flip={{duration: flipDurationMs}}>
                    <Command slashCommand={slashCommand} bind:slashCommands={slashCommands}/>
                </div>
            {/each}
        </div>
        <div class="command-manager">
            <i class="fas fa-plus-square" on:click={addCommand}></i>
            <button on:click={saveSlashCommands}>Save commands</button>
        </div>
    {/await}
</section>

<style>
    /* Navigation bar */
    .navbar {
        width: 100%;
        height: 5rem;
        background-color: #202225;

        display: flex;
        justify-content: space-between;
    }
    .navbar .bot-info {
        display: flex;
        align-items: center;
    }
    .navbar .bot-info p {
        margin: 1rem;
    }
    .navbar div img {
        width: 5rem;
    }
    .byebye {
        display: flex;
        justify-content: center;
        align-items: center
    }
    .logout-button {
        color: #FFFF;
        font-size: 2rem;
        margin: 1rem;
    }
    .logout-button:hover { color: #7289DA; }

    /* Command settings */
    .command-manager {
        display: flex;
        align-items: center;
        justify-content: center;

        float: right;
        margin-right: 1rem;
    }
    .command-manager i {
        color: #FFFF;
        font-size: 2rem;
        margin: 1rem;
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

    /* Slash commands */
    .slashCommands-wrapper {
        margin-top: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
