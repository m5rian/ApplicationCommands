<script>
    export let option;
    export let margin = "0"; // Amount of left margin
</script>
<div class="item child option margin-{margin}">
    <i class="fas fa-file"></i>
    <p>{option["name"]}</p> <!-- Name of option -->
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