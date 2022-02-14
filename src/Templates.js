export function getExampleChoice() {
    return {
        name: "A choice!",
        value: "A value!"
    }
}


export function getExampleOption() {
    return {
        type: 3,
        name: "option",
        description: "Small description",
        required: true,
        choices: [],

        id: generateId()
    }
}

export function getExampleSubcommand() {
    return {
        type: 1,
        name: "subcommand",
        description: "Small description",

        id: generateId()
    }
}

export function getExampleSubcommandGroup() {
    return {
        type: 2,
        name: "subcommandgroup",
        description: "Small description",

        id: generateId()
    }
}

function generateId() {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}