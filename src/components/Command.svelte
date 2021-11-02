<script>
    import CommandSettings from "./CommandSettings.svelte";

    export let data;
    let showSettings = false;

    function showSettingsTrue() {
        showSettings = true;
    }
</script>

<div class="slashCommand">
    <div class="slashCommand-name-description">
        <input type="text" value={data["name"]}/>
        <input class="slashCommand-description" value={data["description"]}/>
    </div>
    <div class="slashCommand-options">
        <div>
            <i class="fas fa-cog slashCommand-settings" on:click={showSettingsTrue}></i>
            <CommandSettings bind:active={showSettings} data={data["options"]}/>
        </div>
        <i class="fas fa-trash slashCommand-delete"></i>
    </div>
</div>

<style>

    input {
        font-size: 1rem;
        color: #ffff;
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


    .slashCommand {
        background-color: #424549;
        width: 45rem;

        padding: 0.5rem;
        margin: 0.5rem;

        border-radius: 1rem;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .slashCommand-name-description {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
    }

    .slashCommand-description {
        font-size: 0.5rem;
    }

    .slashCommand-options {
        display: flex;
        align-items: center;
    }

    .slashCommand-delete {
        color: #F04747;
        margin-right: 1rem;
    }

    .slashCommand-settings {
        color: #ffffff;
        margin-right: 0.5rem;
    }

    .slashCommand-settings:hover {
        color: #7289DA;
    }
</style>