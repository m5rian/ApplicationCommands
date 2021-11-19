<script>
    import OptionSettings from "./OptionSettings.svelte";

    export let margin = "0" // Amount of left margin
    export let options
    export let option
    let showSettings = false;

    export let dnd
    $: dnd = showSettings

    function openSettings() {
        showSettings = true
    }

    function deleteOption() {
        options = options.filter(item => item !== option)
    }
</script>
<div class="option-wrapper item margin-{margin}">
    <div class="name">
        <i class="fas fa-file icon-option-type"></i>
        <input value={option.name} on:change={event => option.name = event.target.value}> <!-- Name of option -->
    </div>

    <div>
        <i class="fas fa-cog icon-cog" on:click={openSettings}></i>
        <i class="fas fa-trash icon-delete" on:click={deleteOption}></i>
        <OptionSettings bind:active={showSettings} bind:options bind:option/>
    </div>
</div>

<style>
    .option-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .name > i,
    .name > p {
        transition: color cubic-bezier(.67, .01, .58, .99) 0.25s;
    }

    .name:hover > p,
    .name:hover > i {
        color: #7289DA;
    }
</style>