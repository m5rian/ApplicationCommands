<script>
    export let options;
    export let option;
    export let active;

    let type
    $: type = option.type

    function closeOptions() {
        active = false;
    }

    function onTypeChange() {
        option["type"] = document.getElementById("type-dropdown").value
    }
</script>

<div class="popup {active ? 'active': ''}">
    <div class="popup-window">
        <i class="fas fa-times close-window" on:click={closeOptions}></i>

        <div class="setting">
            <p>Type</p>
            <select id="type-dropdown" on:change={onTypeChange}>
                <option selected={type === 3} value="3">String</option>
                <option selected={type === 4} value="4">Integer</option>
                <option selected={type === 5} value="5">Boolean</option>
                <option selected={type === 6} value="6">User</option>
                <option selected={type === 7} value="7">Channel</option>
                <option selected={type === 8} value="8">Role</option>
                <option selected={type === 9} value="9">Mentionable</option>
                <option selected={type === 10} value="10">Number</option>
            </select>
        </div>

    </div>
</div>

<style>
    .popup {
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: #2F3136BF;

        display: none;
    }
    .popup.active {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .popup-window {
        background-color: #282B30;
        padding: 2rem;
        border-radius: 1rem;
    }

    .close-window {
        position: relative;
        right: -100%;
        top: -20px;

        color: #FFFFFF;
    }
    .close-window:hover {
        color: #7289DA;
    }

    .setting {
        display: flex;
    }

    select {
        /* Remove default styling */
        border: none;
        appearance: none;
        outline: none;

        background-color: #18191C;
        color: #FFFFFF;
        border-radius: 0.5rem;
        width: 5rem;
        height: 1.5rem;

        margin-left: 1rem;
    }
</style>