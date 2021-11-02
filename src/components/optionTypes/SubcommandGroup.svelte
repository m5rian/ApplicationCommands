<script>
    import Subcommand from "./Subcommand.svelte";
    import Option from "./Option.svelte";

    export let subcommandGroup;
</script>

<div>
    <div class="hierarchy-item subcommand-group">
        <i class="fas fa-layer-group"></i>
        <p>{subcommandGroup["name"]}</p> <!-- Name of option of subcommand group -->
    </div>

    <!-- Subcommand group Subcommands -->
    {#if subcommandGroup["options"] === undefined || subcommandGroup["options"].length === 0}
    {:else}
        {#each subcommandGroup["options"] as subcommand}
            <Subcommand subcommand={subcommand} margin="1"/>

            <!-- Subcommand group subcommand options -->
            {#if subcommand["options"] === undefined || subcommand["options"].length === 0}
            {:else}
                {#each subcommand["options"] as option}
                    <Option option={option} margin="2"></Option>
                {/each}
            {/if}

        {/each}
    {/if}
</div>