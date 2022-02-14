<div class="loading">
    <i class="fas fa-spinner spinner"> </i>
</div>

<style>
    .loading {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .spinner {
        color: #FFFF;
        font-size: 5rem;
        animation: spin 2s infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>