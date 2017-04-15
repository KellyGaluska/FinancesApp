/*******************************************************************************
    server.js

    Server for finances website written for node.js.
    Registers views and file dependencies.
    Implements REST API for all ajax calls to the json database.

    Start server by navigating to finances directory and typing the
    command "npm start".
    Quit server by using "Ctrl+C".

*******************************************************************************/

/*****Configure Package Dependencies*******************************************/

var express = require('express');
var path = require("path");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*****Views********************************************************************/

app.get("/", function (req, res) {
    console.log("Sending home.html...");
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get("/allTransactions", function(req, res) {
    console.log("Sending allTransactions.html...");
    res.sendFile(path.join(__dirname + '/views/allTransactions.html'));
});

app.get("/monthlySpending", function(req, res) {
    console.log("Sending monthlySpending.html...");
    res.sendFile(path.join(__dirname + '/views/monthlySpending.html'));
});

app.get("/checking", function(req, res) {
    console.log("Sending checking.html...");
    res.sendFile(path.join(__dirname + '/views/checking.html'));
});

app.get("/reserve", function(req, res) {
    console.log("Sending reserve.html...");
    res.sendFile(path.join(__dirname + '/views/reserve.html'));
});

app.get("/growth", function(req, res) {
    console.log("Sending growth.html...");
    res.sendFile(path.join(__dirname + '/views/growth.html'));
});

/*****CSS**********************************************************************/

app.get("/static/lib/bootstrap.min.css", function(req, res) {
    console.log("Sending bootstrap.min.css...");
    res.sendFile(path.join(__dirname + "/static/lib/bootstrap.min.css"));
});

/*****Scripts******************************************************************/

app.get("/static/databaseAPI.js", function(req, res) {
    console.log("Sending databaseAPI.js...");
    res.sendFile(path.join(__dirname + "/static/databaseAPI.js"));
});

app.get("/static/accountsPlot.js", function(req, res) {
    console.log("Sending accountsPlot.js...");
    res.sendFile(path.join(__dirname + "/static/accountsPlot.js"));
});

/*****REST API*****************************************************************/

app.get("/rest/getAllTransactions", function(req, res) {
    console.log("Querying for all transactions...");
    fs.readFile(__dirname + "/static/db/transactions.json", 'utf8', function (err, data) {
       console.log(data);
       res.end(data);
   });
});

app.get("/rest/getAllAccounts", function(req, res) {
    console.log("Querying for all accounts...");
    fs.readFile(__dirname + "/static/db/accounts.json", 'utf8', function (err, data) {
       console.log(data);
       res.end(data);
   });
});

app.get("/rest/getCategories", function(req, res) {
    console.log("Querying for all transaction categories...");
    fs.readFile(__dirname + "/static/db/categories.json", 'utf8', function (err, data) {
       console.log(data);
       res.end(data);
   });
});

app.get("/rest/getNewID", function(req, res) {
    console.log("Getting new ID...");
    fs.readFile(__dirname + "/static/db/id.json", 'utf8', function (err, data) {
       console.log(data);
       res.end(data);
   });
});

app.get("/rest/getAccountsHistory", function(req, res) {
    console.log("Getting accounts history...");
    fs.readFile(__dirname + "/static/db/accountsHistory.json", 'utf8', function (err, data) {
       console.log(data);
       res.end(data);
   });
});

app.post("/rest/updateAccounts", function(req, res) {
    console.log("Updating accounts...");
    fs.writeFile(__dirname + "/static/db/accounts.json", JSON.stringify(req.body, null, 4), function (err) {
        //console.log(data);
        res.end(JSON.stringify(req.body));
    });
});

app.post("/rest/updateTransactions", function(req, res) {
    console.log("Updating transactions...");
    fs.writeFile(__dirname + "/static/db/transactions.json", JSON.stringify(req.body, null, 4), function (err) {
        //console.log(data);
        res.end(JSON.stringify(req.body));
    });
});

app.post("/rest/updateAccountsHistory", function(req, res) {
    console.log("Updating accounts history...");
    fs.writeFile(__dirname + "/static/db/accountsHistory.json", JSON.stringify(req.body, null, 4), function (err) {
        //console.log(data);
        res.end(JSON.stringify(req.body));
    });
});

app.post("/rest/incrementID", function(req, res) {
    console.log("Incrementing ID...");
    fs.writeFile(__dirname + "/static/db/id.json", JSON.stringify(req.body, null, 4), function (err) {
        //console.log(data);
        res.end(JSON.stringify(req.body));
    });
});


/*****Start Server*************************************************************/

app.listen(3000, "0.0.0.0", function () {
  console.log('Listening on port 3000!');
});
