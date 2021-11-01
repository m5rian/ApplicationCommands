<script>
    import {deleteCookie, getCookie} from "../Utilities";
    import Command from "../components/Command.svelte";

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
    let slashCommands = []

    /**
     * @returns {Promise<Response>} Returns a json promise of the bots user data.
     */
    async function loadBotData() {
        const headers = new Headers();
        headers.append("Authorization", "Bot " + getCookie("token"))

        const promise = await fetch("https://discord.com/api/v6/users/@me", {headers: headers})
        const json = await promise.json()

        bot = json
        return json
    }

    /**
     *
     * @returns {Promise<Response<any, Record<string, any>, number>>}
     */
    async function loadSlashCommands() {
        const headers = new Headers();
        headers.append("token", getCookie("token"))
        headers.append("id", bot["id"])

        const url = window.location.protocol + "//" + window.location.hostname + ":8081/slashCommands"
        const promise = await fetch(url, {headers: headers})
        const json = await promise.json()

        slashCommands = json
        return json
    }

    function addCommand() {
        const commandTemplate = {
            default_permission: true,
            default_member_permissions: null,
            name: 'command',
            description: 'I can do cool stuff',
            dm_permission: null,
            options: []
        }
        slashCommands = [...slashCommands, commandTemplate]
    }
</script>

<section>
    {#await loadBotData()}
        <div class="loading">
            <i class="fas fa-spinner spinner"></i>
        </div>
    {:then data}
        <div class="navbar">
            <div class="bot-info">
                <img src={"https://cdn.discordapp.com/avatars/" + bot["id"] + "/" + bot["avatar"] + ".png"} alt=""/>
                <p>{bot["username"]}</p>
            </div>
            <div class="byebye">
                <i class="fas fa-sign-out-alt logout-button" on:click={onLogout}></i>
            </div>
        </div>
        {#await loadSlashCommands() then commands}
            <div class="slashCommands-wrapper">
                {#each slashCommands as slashCommand}
                    <Command data={slashCommand}/>
                {/each}
            </div>

            <div class="add-command">
                <i class="fas fa-plus-square" on:click={addCommand}></i>
            </div>
        {/await}
    {/await}
</section>

<style>
    .add-command {
        width: 100vw;
    }

    .add-command i {
        position: absolute;
        bottom: 0;
        right: 0;

        color: #ffff;
        font-size: 2rem;

        margin: 1rem;
    }

    .add-command i:hover {
        color: #7289DA;
    }


    section {
        width: 100vw;
        height: 100vh;
    }


    .navbar {
        width: 100%;
        height: 5rem;
        background-color: #2f3136;

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

    .navbar .byebye {
        display: flex;
        align-items: center;
    }

    .logout-button {
        color: #ffff;
        font-size: 2rem;
        margin: 1rem;
    }

    .logout-button:hover {
        color: #7289DA;
    }


    .slashCommands-wrapper {
        margin-top: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>
