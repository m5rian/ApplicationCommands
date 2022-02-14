<script>
    import OptionWrapper from "../OptionWrapper.svelte";
    import Subcommand from "./Subcommand.svelte";
    import {getExampleSubcommand} from "../../../Templates";

    export let options;
</script>

<div>
    <OptionWrapper addOption={() => options = [...options, getExampleSubcommand()]} optionType="1"/>

    {#each options as option}
        {#if option.type === 1}
            <Subcommand bind:subcommand={option}/>
        {/if}
    {/each}
</div>