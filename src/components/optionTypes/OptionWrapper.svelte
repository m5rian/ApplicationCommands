<script>
    export let optionType = undefined
    export let addOption

    let name
    switch (optionType) {
        case "1":
            name = "Subcommand"
            break
        case "2":
            name = "Subcommand group"
            break
        default:
            name = "Option"
            break
    }
</script>

<div class="add-item-wrapper">
    <p>Add {name}</p>
    <i class="fas fa-plus-square icon-add" on:click={() => addOption()}></i>
</div>

<style>
    .add-item-wrapper {
        display: flex;
        text-align: center;
        align-items: center;
        gap: 5px;

        margin-top: 10px;
    }

    .icon-add {
        color: #7289DA;
        margin-right: 0.5rem;
        cursor: pointer;
    }
</style>