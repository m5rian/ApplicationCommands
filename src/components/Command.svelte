<script>
    import SubcommandGroup from "./optionTypes/SubcommandGroup.svelte";
    import Subcommand from "./optionTypes/Subcommand.svelte";
    import Option from "./optionTypes/Option.svelte";

    export let slashCommands;
    export let slashCommand;
    export let dnd;
    let subcommandGroups = [];
    let subcommands = [];
    let options = [];

    $: {
        console.log(JSON.stringify(slashCommand, null, 3))

        if (slashCommand["options"] === undefined) slashCommand.options = []

        if (subcommandGroups.length === 0 && subcommands.length === 0 && options.length === 0) {
            console.log("Loading options from slash command...")
            subcommands = slashCommand["options"].filter(item => item.type === 1)
            subcommandGroups = slashCommand["options"].filter(item => item.type === 2)
            options = slashCommand["options"].filter(item => item.type > 2)
        } else {
            console.log("Loading options to slash command...")
            slashCommand["options"] = [...subcommandGroups, ...subcommands, ...options]
        }
    }

    let showSettings = false;

    function showSettingsTrue() {
        showSettings = true;
    }

    function deleteSlashCommand() {
        slashCommands = slashCommands.filter(value => value !== slashCommand);
    }

    function addSubcommandGroup() {
        const child = {
            name: "Subcommandgroup",
            description: "yes",
            type: 1
        }
        slashCommand["options"] = [...slashCommand["options"], child]
    }

    function addSubcommand() {
        const child = {
            name: "Subcommand",
            description: "yes",
            type: 2
        }
        slashCommand["options"] = [...slashCommand["options"], child]
    }

    function addOption() {
        const child = {
            type: 3,
            name: "option",
            description: "Most of the time here you explain in more detail what the option type is bruh",
            "required": true
        }
        slashCommand["options"] = [...slashCommand["options"], child]
    }


    function updateName(input) {
        slashCommands = slashCommands.filter(item => item !== slashCommand)
        slashCommand.name = input
        slashCommands = [...slashCommands, slashCommand]
    }

    function updateDescription(input) {
        slashCommands = slashCommands.filter(item => item !== slashCommand)
        slashCommand.description = input
        slashCommands = [...slashCommands, slashCommand]
    }
</script>

<div class="slash-command-wrapper">
    <!-- Slash command itself -->
    <div class="root item">
        <div class="slash-command-info">
            <input type="text" value={slashCommand["name"]} on:change={event => updateName(event.target.value)}/>
            <input class="slashCommand-description" value={slashCommand["description"]}
                   on:change={event => updateDescription(event.target.value)}/>
        </div>
        <div>
            <i class="fas fa-plus-square icon-add" on:click={addSubcommandGroup}></i>
            <i class="fas fa-trash icon-delete" on:click={deleteSlashCommand}></i>
        </div>
    </div>

    <!-- Subcommand groups -->
    <div class="slash-command-children">
        {#each subcommandGroups as subcommandGroup}
            <SubcommandGroup/>
        {/each}
        <div class="add-item-wrapper">
            <p>Add subcommand group</p>
            <i class="fas fa-plus-square icon-add" on:click={addSubcommandGroup}></i>
        </div>
    </div>

    <div class="spacing-line"></div>

    <!-- Subcommands -->
    <div class="slash-command-children">
        {#each subcommands as subcommand}
            <Subcommand bind:subcommands bind:subcommand={subcommand} bind:dnd margin="1"/>
        {/each}
        <div class="add-item-wrapper">
            <p>Add subcommand</p>
            <i class="fas fa-plus-square icon-add" on:click={addSubcommand}></i>
        </div>
    </div>

    <div class="spacing-line"></div>

    <!-- Options -->
    <div class="slash-command-children">
        {#each options as option}
            <Option bind:options bind:option={option} bind:dnd margin="2"/>
        {/each}
        <div class="add-item-wrapper">
            <p>Add option</p>
            <i class="fas fa-plus-square icon-add" on:click={addOption}></i>
        </div>
    </div>

</div>

<style>
    .spacing-line {
        background-color: #808184;
        padding: 1px 0;
        border-radius: 1rem;
        margin: 1rem;
    }

    .add-item-wrapper {
        display: flex;
        text-align: center;
        margin-left: 0.25rem;
    }

    .add-item-wrapper > p {
        margin-right: 0.5rem;
    }

    .root {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .slash-command-wrapper {
        width: 75vw;
        padding: 0.5rem;
        background-color: #32353B;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }

    .slash-command-info {
        display: flex;
        flex-direction: column;
    }

    .slashCommand-description {
        font-size: 0.5rem;
    }

    input {
        font-size: 1rem;
        color: #FFFF;
        border: none;
        background-image: none;
        background-color: transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }

    input:focus {
        outline: none;
    }

    .add-item-button {
        color: #7289DA;
        cursor: pointer;
    }
</style>