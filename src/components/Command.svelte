<script>
    import Option from "./Option.svelte";
    import Subcommand from "./Subcommand.svelte";
    import SubcommandGroup from "./SubcommandGroup.svelte";

    export let data;
</script>

<div class="slashCommand">
    <div class="slashCommand-name-description">
        <input type="text" value={data["name"]}/>
        <input class="slashCommand-description" value={data["description"]}/>
    </div>
    {#each data["options"] as option}
        {#if data["type"] > 2 }
            <Option data={option}/>
        {:else if data["type"] === 1}
            <Subcommand data={option}/>
        {:else if data["type"] === 2}
            <SubcommandGroup data={option}/>
        {/if}

    {/each}
    <i class="fas fa-trash slashCommand-delete"></i>
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

    .slashCommand-delete {
        color: #F04747;
        margin-right: 1rem;
    }
</style>