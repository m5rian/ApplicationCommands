<script>
    export let data;
    let options = [];
    if (data["options"] !== undefined) options = data["options"];

    let active = false;

    function toggleSettings() {
        active = !active
    }

</script>

<div class="subcommand" on:click={toggleSettings}>
    <p>{data["name"]}</p>

    <div class="popup {active ? 'active': ''}">
        <div class="popup-window">
            <table class="option-wrapper">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                </tr>
                {#each options as option}
                    <tr>
                        <td>{option["name"]}</td>
                        <td>{option["description"]}</td>
                        <td>{option["type"]}</td>
                    </tr>
                {/each}
            </table>
        </div>
    </div>
</div>

<style>

    .option-wrapper {
        border-collapse: separate;
        border-spacing: 2rem 0.5rem;
    }

    th {
        color: #ffffff;
        font-size: 2rem;
    }

    tr {
        color: #ffffff;
        font-size: 1rem;
    }

</style>