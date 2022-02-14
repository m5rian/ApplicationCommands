<script>
    import OptionSettings from "./OptionSettings.svelte";

    export let option
    let showSettings = false;
</script>

<div class="option-wrapper">
    <div class="item">

        <div class="name">
            <i class="fas fa-file icon-option-type"></i>
            <input on:change={event => option.name = event.target.value} value={option.name}>
        </div>

        <div>
            <i class="fas fa-cog icon-cog" on:click={() => showSettings = true}></i>
            <i class="fas fa-trash icon-delete" on:click={() => option = undefined}></i>
            <OptionSettings bind:active={showSettings} bind:option/>
        </div>

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

    .icon-option-type { color: #50CAB1 }

    .name > input {transition: color cubic-bezier(.67, .01, .58, .99) 0.25s }
    .name:hover > input { color: #50CAB1 }
</style>