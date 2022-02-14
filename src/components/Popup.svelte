<script>
    export let active;
</script>

<div class="popup {active ? 'active': ''}">
    <div class="popup-window">
        <i class="fas fa-times close-window" on:click={() => active = false}></i>

        <slot/>

    </div>
</div>

<style>
    .popup {
        width: 100vw;
        height: 100vh;
        position: fixed;

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

        height: auto;
        max-height: 95vh;
        overflow-y: auto;
        overflow-x: hidden;
        word-break: normal !important;
        word-wrap: normal !important;
        white-space: pre !important;
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
</style>