<script>
    import Option from "./Option.svelte";

    export let subcommand;
    export let margin = "0"; // Amount of left margin
</script>

<div>
    <div class="hierarchy-item subcommand">
        <i class="fas fa-folder"></i>
        <p>{subcommand["name"]}</p> <!-- Name of subcommand -->
    </div>
    <!-- Subcommand options -->
    {#if subcommand["options"] === undefined || subcommand["options"].length === 0}
    {:else}
        {#each subcommand["options"] as option}
            <Option option={option} margin="1"/>
        {/each}
    {/if}
</div>

<style>
    .subcommand {
        background-color: #FAA419;
    }

    .subcommand > i {
        color: #ffffff;
        font-size: 2rem;
        margin-right: 0.5rem;
    }

    .subcommand:hover > p,
    .subcommand:hover > i {
        color: #FAA419;
    }

    .subcommand:hover {
        background-color: #ffffff;
    }
</style>