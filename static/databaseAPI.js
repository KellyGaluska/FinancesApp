/*******************************************************************************
    databaseAPI.js

    JavaScript functions for handling interactions with the REST API
    implemented in server.js.

*******************************************************************************/


/***************************Misc Functions*************************************/

function completeTransaction(T) {
    //var accountAmount = getAccounts()[T.account];
    var newAmount = parseFloat(getAccounts()[T.account]) + parseFloat(T.amount);
    addTransaction(T);
    updateAccount(T.account, String(newAmount.toFixed(2)));
    updateAccountHistory(T.account, {amount: String(newAmount.toFixed(2)), date: T.dateStr});
}

function completeTransfer(T) {
    var newFromAmount = parseFloat(getAccounts()[T.from]) - parseFloat(T.amount);
    updateAccount(T.from, String(newFromAmount.toFixed(2)));
    updateAccountHistory(T.from, {amount: String(newFromAmount.toFixed(2)), date: T.date});

    var newToAmount = parseFloat(getAccounts()[T.to]) + parseFloat(T.amount);
    updateAccount(T.to, String(newToAmount.toFixed(2)));
    updateAccountHistory(T.to, {amount: String(newToAmount.toFixed(2)), date: T.date});

}

function getMonthString(monthInt) {
    var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthArr[monthInt];
}

/***************************Transactions JSON**********************************/

// Returns all of the finance transaction objects in the database.
function getAllTransactions() {
    var json;
    $.ajax({
        url: "/rest/getAllTransactions",
        type: "GET",
        async: false,
        success: function(data) {
            json = JSON.parse(data);
        }
    });
    return json;
}

// Returns transaction object and index for a unique id.
// Accepts optional transactions argument.
function getTransactionByID(id, transactions) {
    // If transactions is not passed as an argument, retrieve
    // all transactions from the db.
    if(typeof transactions === "undefined") {
        transactions = getAllTransactions();
    }
    for(var i = 0; i < transactions.length; i++) {
        if(transactions[i].transactionID == id) {
            return {
                "transaction": transactions[i],
                "index": i
            };
        }
    }
    return false;
}

// Returns transaction objects where the month matches the month and year in the
// date object argument.
// Accepts optional transactions argument.
function getTransactionsByMonthAndYear(date, transactions) {
    if(typeof transactions === "undefined") {
        transactions = getAllTransactions();
    }
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();
    var monthArr = [];
    for(var i = 0; i < transactions.length; i++) {
        var currentMonth = new Date(transactions[i].dateStr).getMonth() + 1;
        var currentYr = new Date(transactions[i].dateStr).getFullYear();
        if(currentMonth == month && currentYr == year) {
            monthArr.push(transactions[i]);
        }
    }
    return monthArr;
}

function getTransactionsByYear(date, transactions) {
    if(typeof transactions === "undefined") {
        transactions = getAllTransactions();
    }
    var year = new Date(date).getFullYear();
    var yearArr = [];
    for(var i = 0; i < transactions.length; i++) {
        var current = new Date(transactions[i].dateStr).getFullYear();
        if(current == year) {
            yearArr.push(transactions[i]);
        }
    }
    return yearArr;
}

function getNegativeTransactions(transactions) {
    if(typeof transactions === "undefined") {
        transactions = getAllTransactions();
    }
    var neg = [];
    for(var i = 0; i < transactions.length; i++) {
        if(parseFloat(transactions[i].amount) < 0) {
            neg.push(transactions[i]);
        }
    }
    return neg;
}

function getPositiveTransactions(transactions) {
    if(typeof transactions === "undefined") {
        transactions = getAllTransactions();
    }
    var neg = [];
    for(var i = 0; i < transactions.length; i++) {
        if(parseFloat(transactions[i].amount) > 0) {
            neg.push(transactions[i]);
        }
    }
    return neg;
}

function addTransaction(newTransaction) {
    var transactions = getAllTransactions();
    transactions.push(newTransaction);
    $.ajax({
        url: "/rest/updateTransactions",
        type: "POST",
        async: false,
        data: JSON.stringify(transactions),
        contentType: "application/json",
        success: function(data) {
            console.log(data);
        }
    });
}

function deleteTransaction(id) {

}

function modifyTransaction(id) {

}



/******************************Accounts JSON***********************************/

// Returns all accounts.
function getAccounts() {
    var json;
    $.ajax({
        url: "/rest/getAllAccounts",
        type: "GET",
        async: false,
        success: function(data) {
            json = JSON.parse(data);
        }
    });
    return json;
}

function updateAccount(accountName, newAmount) {
    var accounts = getAccounts();
    accounts[accountName] = newAmount;
    $.ajax({
        url: "/rest/updateAccounts",
        type: "POST",
        async: false,
        data: accounts,
        success: function(data) {
            console.log(data);
        }
    });
}

/******************************Categories JSON*********************************/

function getCategories() {
    var json;
    $.ajax({
        url: "/rest/getCategories",
        type: "GET",
        async: false,
        success: function(data) {
            json = JSON.parse(data);
        }
    });
    return json;
}

/******************************ID JSON*****************************************/

function getNewID() {
    var id;
    $.ajax({
        url: "/rest/getNewID",
        type: "GET",
        async: false,
        success: function(data) {
            id = JSON.parse(data);
        }
    });
    var newID = id.ID;
    id.ID = parseInt(id.ID) + 1;
    $.ajax({
        url: "/rest/incrementID",
        type: "POST",
        async: false,
        data: id,
        success: function(data) {
            console.log(data);
        }
    });
    return newID;
}

/***************************Accounts History JSON******************************/

function getAllAccountsHistory() {
    var json;
    $.ajax({
        url: "/rest/getAccountsHistory",
        type: "GET",
        async: false,
        success: function(data) {
            json = JSON.parse(data);
        }
    });
    return json;
}

function getHistoryByAccount(account) {
    var history = getAllAccountsHistory()[account];
    history.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });
    return history;
}

function updateAccountHistory(account, newAmount) {
    var history = getAllAccountsHistory();
    history[account].push(newAmount);
    $.ajax({
        url: "/rest/updateAccountsHistory",
        type: "POST",
        async: false,
        data: JSON.stringify(history),
        contentType: "application/json",
        success: function(data) {
            console.log(data);
        }
    });
}
