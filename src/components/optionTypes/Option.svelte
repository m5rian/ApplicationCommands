<script>
    export let option;
    export let margin = "0"; // Amount of left margin
</script>
<div class="hierarchy-item option {'margin-' + margin}">
    <i class="fas fa-file"></i>
    <p>{option["name"]}</p> <!-- Name of option -->
</div>

<style>
    .option {
        background-color: #7289DA;
    }

    .option > i {
        color: #ffffff;
        font-size: 2rem;
        margin-right: 0.5rem;
    }

    .option:hover > p,
    .option:hover > i {
        color: #7289DA;
    }

    .option:hover {
        background-color: #ffffff;
    }
</style>