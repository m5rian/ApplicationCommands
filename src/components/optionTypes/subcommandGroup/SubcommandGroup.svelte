<script>
    import {getExampleSubcommand} from "../../../Templates";
    import Subcommand from "../subcommand/Subcommand.svelte";
    import Option from "../option/Option.svelte";

    export let option;
    $: {
        option.options = option.options === undefined
            ? []
            : option.options.filter(item => item !== undefined)
    }

    $: options = option.options
</script>

<div class="option-wrapper">

    <!-- SubcommandGroup -->
    <div class="item">
        <div class="name">
            <i class="fas fa-archive  icon-option-type"></i>
            <input bind:value={option.name}/>
        </div>
        <div class="buttons">
            <i class="fas fa-plus-square icon-add" on:click={() => option.options = [...options, getExampleSubcommand()]}></i>
            <i class="fas fa-trash icon-delete" on:click={() => option = undefined}></i>
        </div>
    </div>

    <div>

        {#each options as option}
            {#if option.type === 1 }
                <Subcommand bind:subcommand={option} margin="1"/>
            {/if}
        {/each}
        {#each options as option}
            {#if option.type > 2}
                <Option bind:option margin="1"/>
            {/if}
        {/each}
    </div>
</div>

<style>
    .option-wrapper { margin-left: 15px }

    .item {
        background-color: #2F3136;
        padding: 0.5rem;
        border-radius: 0.75rem;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .buttons { display: flex; gap: 10px }
    .icon-option-type { color: #FE2921 }

    .name { display: flex; gap: 10px }
    .name > input { transition: color cubic-bezier(.67, .01, .58, .99) 0.25s }
    .name:hover > input { color: #FAA419 }
</style>