<script>
    import Option from "./Option.svelte";
    import OptionWrapper from "../OptionWrapper.svelte";
    import {getExampleOption} from "../../../Templates";

    export let options
</script>

<div>
    <OptionWrapper addOption={() => options = [...options, getExampleOption()]} optionType="option"/>

    {#each options as option}
        {#if option.type > 2}
            <Option bind:option/>
        {/if}
    {/each}
</div>