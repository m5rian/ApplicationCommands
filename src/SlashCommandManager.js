import {getCookie} from "./Utilities";


export function addCommand() {
    const commandTemplate = {
        name: 'command',
        description: 'I can do cool stuff',
        options: []
    }
    createSlashCommand(commandTemplate)
}

async function createSlashCommand(command) {
    const body = JSON.stringify(command)
    console.log(body);
    const url = window.location.protocol + "//" + window.location.hostname + ":8081/create"
    const response = await (await fetch(url, {
        method: "POST",
        headers: {
            token: getCookie("token"),
            id: bot["id"],
            json: body
        }
    })).json()
    console.log(response);
    window.location.reload(true);
}

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


export async function saveSlashCommands(command) {
    const url = window.location.protocol + "//" + window.location.hostname + ":8081/update"
    const response = await (await fetch(url, {
        headers: {
            token: getCookie("token"),
            id: bot["id"],
            slashCommands: JSON.stringify(command, null)
        }
    })).json()
    console.log(response);
    window.location.reload(true);
}