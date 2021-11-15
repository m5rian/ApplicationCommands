<script>
    import OptionSettings from "./OptionSettings.svelte";

    export let option;
    let test = []
    export let margin = "0"; // Amount of left margin

    let showSettings = false;

</script>
<div class="option-wrapper item margin-{margin}">
    <div class="child option">
        <i class="fas fa-file icon-option-type"></i>
        <p>{option["name"]}</p> <!-- Name of option -->
    </div>

    <div>
        <i class="fas fa-cog icon-cog" on:click={showSettings = true}></i>
        <i class="fas fa-trash icon-delete"></i>
        <OptionSettings bind:active={showSettings} data={test}/>
    </div>
</div>

<style>
    .option-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .option > i,
    .option > p {
        transition: color cubic-bezier(.67, .01, .58, .99) 0.25s;
    }

    .option:hover > p,
    .option:hover > i {
        color: #7289DA;
    }
</style>