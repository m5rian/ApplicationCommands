<script>
    import SubcommandGroup from "./optionTypes/SubcommandGroup.svelte";
    import Subcommand from "./optionTypes/Subcommand.svelte";

    export let slashCommands;
    export let slashCommand;
    let subcommandGroups = [];
    let subcommands = [];
    let options = [];

    if (slashCommand["options"] != null) {
        for (let i = 0; i < slashCommand["options"].length; i++) {
            let element = slashCommand["options"][i];
            const elementType = element["type"];
            switch (elementType) {
                case 1:
                    subcommands.push(element);
                    break;
                case 2:
                    subcommandGroups.push(element);
                    break;
                default:
                    options.push(element);
            }
        }
    }

    let showSettings = false;

    function showSettingsTrue() {
        showSettings = true;
    }

    function deleteSlashCommand() {
        console.log("tet")
        slashCommands = slashCommands.filter(value => {
            return value !== slashCommand
        });
    }
</script>

<div class="slash-command-wrapper">
    <!-- Slash command itself -->
    <div class="root item">
        <div class="slash-command-info">
            <input type="text" value={slashCommand["name"]}/>
            <input class="slashCommand-description" value={slashCommand["description"]}/>
        </div>
        <div class="slash-command-settings">
            <i class="fas fa-trash icon-delete" on:click={deleteSlashCommand}></i>
        </div>
    </div>

    <!-- Subcommand groups -->
    <div class="slash-command-children">
        {#each subcommandGroups as subcommandGroup}
            <SubcommandGroup/>
        {/each}
    </div>

    <!-- Subcommands -->
    <div class="slash-command-children">
        {#each subcommands as subcommand}
            <Subcommand subcommand={subcommand} margin="1"/>
        {/each}
    </div>
</div>

<style>
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

    .slash-command-settings {
        display: flex;
        align-items: center;
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