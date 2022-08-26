import {getCookie} from './Utilities';
import {toast} from '@zerodevx/svelte-toast';

export async function retrieveCommands(botId) {
    const url = 'http://' + window.location.hostname + ':8182/retrieve'
    const response = await fetch(url, {
        headers: {
            token: getCookie('token'),
            id: botId
        }
    })
    return await response.json()
}

export async function createCommand(botId, command) {
    const url = 'http://' + window.location.hostname + ':8182/create'
    const response = await (await fetch(url, {
        method: 'POST',
        headers: {
            token: getCookie('token'),
            id: botId,
            json: JSON.stringify(command)
        }
    })).json()
    if (response.retry_after !== undefined) toast.push(response.message)
    else window.location.reload(true);
}

export async function saveCommands(botId, commands) {
    const url = 'http://' + window.location.hostname + ':8182/update'
    await (await fetch(url, {
        method: 'POST',
        headers: {
            token: getCookie('token'),
            id: botId,
        },
        body: encodeURI(JSON.stringify(commands, null))
    }))

}