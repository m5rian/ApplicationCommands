<script>
    import Option from "./Option.svelte";

    export let margin = "0"; // Amount of left margin
    export let subcommands; // All subcommands
    export let subcommand;

    let options = [];
    if (subcommand["options"] !== undefined) {
        options = subcommand["options"]
    }

    function deleteSubcommand() {
        subcommands = subcommands.filter(value => value !== subcommand);
    }
</script>

<div class="subcommand-wrapper">
    <!-- Subcommand -->
    <div class="item subcommand margin-{margin}">
        <div class="name">
            <i class="fas fa-folder icon-option-type"></i>
            <p>{subcommand["name"]}</p> <!-- Name of subcommand -->
        </div>
        <div>
            <i class="fas fa-plus-square icon-add"></i>
            <i class="fas fa-trash icon-delete" on:click={deleteSubcommand}></i>
        </div>
    </div>

    <!--Options -->
    {#each options as option}
        <Option bind:options bind:option margin="2"/>
    {/each}
</div>

<style>
    .name > i,
    .name > p {
        transition: color cubic-bezier(.67, .01, .58, .99) 0.25s;
    }

    .name:hover > p,
    .name:hover > i {
        color: #FAA419;
    }
</style>