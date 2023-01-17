var chartEUR;
var chartUSD;
var chartGBP;
var currencyOption = 0;
var currencySymbol = ['€', '$', '£'];

var cardsCount = 0;
var chartsList = [];

var baseUrl = "https://rest.coinapi.io/v1/exchangerate/";
var apiKey = "4347A2CC-DFA3-41CD-98B4-6EE8B04C7656";

$(function () {
    updateChart();
});

function updateChart() {
    chartsList.forEach((el) => {
        var id = el.id;
        var ch = el.ch;

        $.ajax({
            type: "GET",
            url: baseUrl + id + "/EUR",
            headers: { "X-CoinAPI-Key": apiKey },
            success: function (result) {
                var date = new Date();
                $("#" + id + "priceTextEUR").text(result.rate.toFixed(2) + " €");

                ch.updateSeries([{
                    data: [
                        ...ch.w.config.series[0].data,
                        [date.getTime(), result.rate]
                    ]
                }]);

            }
        });
    });

    setTimeout(function () { updateChart() }, 10000);
}

function checkChanged(checkbox) {
    if (checkbox.checked == true) {
        $(checkbox).parent().addClass("is-checked");

        cardsCount++;
        $("#wrap").removeClass("empty");

        if (checkbox.value == "BTC") createElement(checkbox.value, checkbox.name);
        else if (checkbox.value == "ETH") createElement(checkbox.value, checkbox.name);
        else if (checkbox.value == "DOGE") createElement(checkbox.value, checkbox.name);
        else if (checkbox.value == "LTC") createElement(checkbox.value, checkbox.name);
        else if (checkbox.value == "XRP") createElement(checkbox.value, checkbox.name);
        else if (checkbox.value == "DASH") createElement(checkbox.value, checkbox.name);
        else if (checkbox.value == "BCH") createElement(checkbox.value, checkbox.name);

    } else {
        $(checkbox).parent().removeClass("is-checked");

        if (checkbox.value == "BTC") removeElement(checkbox.value);
        else if (checkbox.value == "ETH") removeElement(checkbox.value);
        else if (checkbox.value == "DOGE") removeElement(checkbox.value);
        else if (checkbox.value == "LTC") removeElement(checkbox.value);
        else if (checkbox.value == "XRP") removeElement(checkbox.value);
        else if (checkbox.value == "DASH") removeElement(checkbox.value);
        else if (checkbox.value == "BCH") removeElement(checkbox.value);

        cardsCount--;
        if (cardsCount == 0) $("#wrap").addClass("empty");
    }
}

function createElement(id, title) {
    var div = document.createElement("div");
    div.id = id;
    div.classList.add("element");
    div.innerHTML = '<div class="container"><div class="data-container"><div><h1 class="title">' + title + '</h1></div><div><div id="' + id + 'priceTextEUR" class="price-text"></div></div></div><div id="' + id + '-chartEUR"></div></div>';
    $("#wrap").append(div);
    createChart(id);
}

function removeElement(id) {
    $("#" + id).remove();
    chartsList = chartsList.filter(object => {
        return object.id !== id;
    });
}

function createChart(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + id + "/EUR",
        headers: { "X-CoinAPI-Key": apiKey },
        success: function (result) {
            var date = new Date();
            $("#" + id + "priceTextEUR").text(result.rate.toFixed(2) + " €");

            var options = {
                series: [{
                    name: id + "index",
                    data: [[date.getTime(), result.rate]]
                }],
                chart: {
                    height: 250,
                    type: "line",
                    stacked: true,
                    animations: {
                        enabled: true,
                        easing: "linear",
                        dynamicAnimation: {
                            speed: 1000
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: "straight",
                    width: 5
                },
                grid: {
                    padding: {
                        left: 0,
                        right: 0
                    }
                },
                markers: {
                    size: 0,
                    hover: {
                        size: 0
                    }
                },
                xaxis: {
                    type: "datetime",
                    range: 2700000
                },
                legend: {
                    show: false
                },
            };

            var chart = new ApexCharts(document.querySelector("#" + id + "-chartEUR"), options);
            chart.render();

            chartsList.push({
                id: id,
                ch: chart
            });
        }
    });
}