const express = require('express');
const client = require("./db");
const app = express();
const PORT = 8082;
 
app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});

client.connect();

app.get("/customers", (req, res)=> {
    client.query(`Select * from customers`, (err, result)=> {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
});

