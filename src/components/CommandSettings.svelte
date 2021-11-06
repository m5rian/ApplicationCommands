<script>
    import SubcommandGroup from "./optionTypes/SubcommandGroup.svelte";
    import Subcommand from "./optionTypes/Subcommand.svelte";
    import Option from "./optionTypes/Option.svelte";

    export let data;
    export let active = false;

    function closeOptions() {
        active = false;
    }


</script>

<div class="popup {active ? 'active': ''}">
    <div class="popup-window">
        <i class="fas fa-times close-window" on:click={closeOptions}></i>

        <!-- Options -->
        <div class="option-hierarchy">
            {#each data as option}

                {#if option["type"] === 2} <!-- Subcommand group -->
                    <SubcommandGroup subcommandGroup={option}/>
                {:else if option["type"] === 1} <!-- Subcommand -->
                    <Subcommand subcommand={option}/>
                {:else} <!-- Option -->
                    <Option option={option}/>
                {/if}

            {/each}
        </div>

        <div class="add-option">
            <i class="fas fa-plus-square"></i>
        </div>

    </div>
</div>

<style>
    .close-window {
        position: relative;
        right: -100%;
        top: -20px;

        color: #ffffff;
    }

    .close-window:hover {
        color: #7289DA;
    }

    .option-hierarchy {
        border-collapse: separate;
        border-spacing: 2rem 0;
    }
</style>