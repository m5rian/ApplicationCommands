<script>
    import Option from "./Option.svelte";

    export let subcommand;
    let options = [];
    if (subcommand["options"] !== undefined) {
        options = subcommand["options"]
    }

    export let margin = "0"; // Amount of left margin
</script>

<div class="subcommand-wrapper">
    <div class="item child subcommand margin-{margin}">
        <i class="fas fa-folder icon-option-type"></i>
        <p>{subcommand["name"]}</p> <!-- Name of subcommand -->
    </div>

    <!--Options -->
    {#each options as option}
        <Option option={option} margin="2"/>
    {/each}
</div>

<style>
    .subcommand > i,
    .subcommand > p {
        transition: color cubic-bezier(.67, .01, .58, .99) 0.25s;
    }

    .subcommand:hover > p,
    .subcommand:hover > i {
        color: #FAA419;
    }
</style>