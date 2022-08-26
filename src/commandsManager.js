import {getCookie} from './Utilities';
import {toast} from '@zerodevx/svelte-toast';

export async function retrieveCommands(botId, scope) {
    let url;
    if (scope === 'global') url = 'http://' + window.location.hostname + ':8182/retrieve';
    else url = 'http://' + window.location.hostname + ':8182/retrieve?guild_id=' + scope;

    const response = await fetch(url, {
        headers: {
            token: getCookie('token'),
            id: botId
        }
    })
    if (response.status !== 200) toast.push(response.message);
    else return await response.json();
}

export async function saveCommands(botId, scope, commands) {
    let url;
    if (scope === 'global') url = `http://${window.location.hostname}:8182/update`;
    else url = `http://${window.location.hostname}:8182/update?guild_id=${scope}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {token: getCookie('token'), id: botId,},
        body: encodeURI(JSON.stringify(commands, null))
    });
    if (response.status !== 200) toast.push(response.message);
}