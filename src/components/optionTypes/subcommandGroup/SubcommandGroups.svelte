<script>
    import OptionWrapper from "../OptionWrapper.svelte";
    import SubcommandGroup from "./SubcommandGroup.svelte";
    import {getExampleSubcommandGroup} from "../../../Templates";

    export let options;
</script>

<div>
    <OptionWrapper addOption={() => options = [...options, getExampleSubcommandGroup()]} optionType="2"/>

    {#each options as option}
        {#if option.type === 2}
            <SubcommandGroup bind:option/>
        {/if}
    {/each}
</div>