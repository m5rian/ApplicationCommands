import fetch from 'node-fetch';
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get("/slashCommands", async (req, res) => {
    const token = req.header("token");
    const id = req.header("id")

    const url = "https://discord.com/api/v8/applications/" + id + "/commands"
    const promise = await fetch("https://discord.com/api/v8/applications/" + id + "/commands", {
        method: "GET",
        headers: {
            Authorization: "Bot " + token
        }
    })
    const response = await promise.json()

    res.status(200)
    console.log(JSON.stringify(response, null, 2))
    //res.contentType("application/json")
    res.send(response);
});

app.listen(8081, () => {
    console.log("App's running on port 8081");
});