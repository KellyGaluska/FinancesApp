function plotHistory(history, markerClr, fillClr) {
    var trace = {
        x: getDates(history),
        y: getAmounts(history),
        fill: "tonexty",
        fillcolor: fillClr,
        marker: {
            color: markerClr
        },
        type: "scatter"
    };

    var selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1 Month',
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6 Months'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1 Year'
        }, {
            step: 'all',
            label: "All"
        }],
    };

    var layout = {
        title: "Balance History",
        titlefont: {
            color: "#FFFFFF"
        },
        //plot_bgcolor: "black",
        paper_bgcolor: "#222222",
        xaxis: {
            title: "Date",
            type: "date",
            rangeselector: selectorOptions,
            rangeslider: {},
            showline: true,
            titlefont: {
                color: "#FFFFFF"
            },
            tickfont: {
                color: "#FFFFFF"
            }
        },
        yaxis: {
            title: "Balance",
            tickprefix: "$",
            exponentformat: "none",
            showline: true,
            titlefont: {
                color: "#FFFFFF"
            },
            tickfont: {
                color: "#FFFFFF"
            }
        }
    };

    Plotly.plot("historyPlot", [trace], layout);
}

function getDates(history) {
    var dates = [];
    for(var i = 0; i < history.length; i++) {
        dates.push(new Date(history[i].date));
    }
    return dates;
}

function getAmounts(history) {
    var amounts = [];
    for(var i = 0; i < history.length; i++) {
        amounts.push(history[i].amount);
    }
    console.log(amounts);
    return amounts;
}
