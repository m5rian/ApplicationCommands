<script>
    import OptionSettings from "./OptionSettings.svelte";

    export let option;
    let test = []
    export let margin = "0"; // Amount of left margin

    let showSettings = false;

</script>
<div class="item child option margin-{margin}">
    <div>
        <i class="fas fa-file"></i>
        <p>{option["name"]}</p> <!-- Name of option -->
    </div>

    <div>
        <i class="fas fa-cog icon-cog" on:click={showSettings = true}></i>
        <OptionSettings bind:active={showSettings} data={test}/>
    </div>
</div>

<style>
    .option > i,
    .option > p {
        transition: color cubic-bezier(.67, .01, .58, .99) 0.25s;
    }

    .option > i {
        color: #ffffff;
        font-size: 1.5rem;
        margin-right: 0.5rem;
    }

    .option:hover > p,
    .option:hover > i {
        color: #7289DA;
    }
</style>