const express = require('express');
const client = require("./db");
const bodyParser = require('body-parser')
const app = express();
const PORT = 8082;
 
app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});

client.connect();

app.get("/customers", (req, res)=> {
    client.query(`SELECT * FROM customers`, (err, result)=> {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
});

// app.use(bodyParser.json());

// app.post("/customers", (req, res)=> {
//     const customer = req.body;
//     console.log(customer)
//     let insertQuery = `INSERT INTO customers(firstname, lastname, "CustomerID", address, "idType", "registrationDate")
//             VALUES ('${customer.firstname}', '${customer.lastname}', '${customer.CustomerID}', '${customer.address}', '${customer.idType}', '${customer.registrationDate}');`
//     client.query(insertQuery, (err, result)=> {
//         if (!err) {
//             res.send("Insertion Was Sucessful");
//         } else{
//             console.log("Insertion was not successful")
//         }
//     });
//     client.end;
// });