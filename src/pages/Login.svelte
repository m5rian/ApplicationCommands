<script>
    import {setCookie} from "../Utilities";

    let token;

    function login() {
        fetch("https://discord.com/api/v6/users/@me", {
            headers: {Authorization: "Bot " + token},
        })
            // Check for error
            .then((res) => {
                if (res.status === 401) {
                    alert("whoups");
                    return Promise.reject();
                } else {
                    return res.json();
                }
            })
            // On no error, redirect to main homepage
            .then((data) => {
                setCookie("token", token, 1);
                window.location.href = window.location.origin;
            });
    }
</script>

<section>
    <div>
        <p>Login</p>
        <div class="input">
            <input type="text" placeholder="Bot token" bind:value={token}/>
            <i class="fas fa-arrow-circle-right login-icon" on:click={login}></i>
        </div>
    </div>
</section>

<style>
    section {
        width: 100vw;
        height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;
    }

    .login-icon {
        color: #ffff;
        font-size: 1.5rem;
        margin-left: 0.5rem;
    }

    .login-icon:hover {
        color: #7289da;
    }

    .input {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input, button, select, textarea {
        border: none;

        width: 15rem;
        height: 2rem;

        padding: 0 0.25rem;
    }

    input:focus {
        outline: none;
    }
</style>
