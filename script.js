var chartEUR;
var chartUSD;
var chartGBP;
var currencyOption = 0;
var currencySymbol = ['€', '$', '£'];

$(function () {

    $.getJSON("https://api.coindesk.com/v1/bpi/currentprice.json", function (data) {
        //dataPoints.push({ x: new Date(data.time.updated), y: data.bpi.EUR.rate_float });
        var date = new Date(data.time.updated);

        $('#priceTextEUR').text(data.bpi.EUR.rate_float.toFixed(2) + " €");
        $('#priceTextUSD').text(data.bpi.USD.rate_float.toFixed(2) + " $");
        $('#priceTextGBP').text(data.bpi.GBP.rate_float.toFixed(2) + " £");

        var optionsEUR = {
            series: [{
                name: "Bitcoin index",
                data: [[date.getTime(), data.bpi.EUR.rate_float]]
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

        chartEUR = new ApexCharts(document.querySelector("#chartEUR"), optionsEUR);
        chartEUR.render();

        var optionsUSD = {
            series: [{
                name: "Bitcoin index",
                data: [[date.getTime(), data.bpi.USD.rate_float]]
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

        chartUSD = new ApexCharts(document.querySelector("#chartUSD"), optionsUSD);
        chartUSD.render();

        var optionsGBP = {
            series: [{
                name: "Bitcoin index",
                data: [[date.getTime(), data.bpi.GBP.rate_float]]
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

        chartGBP = new ApexCharts(document.querySelector("#chartGBP"), optionsGBP);
        chartGBP.render();

        updateChart();
    });

});

function changeCurrency(el, choice) {
    $('.currency-item').removeClass('active');
    $(el).addClass('active');

    currencyOption = choice;

    if (choice == 0) {
        $('#priceTextEUR').show();
        $('#priceTextUSD').hide();
        $('#priceTextGBP').hide();

        $('chartEUR').show();
        $('chartUSD').hide();
        $('chartGBP').hide();
    } else if (choice == 1) {
        $('#priceTextEUR').hide();
        $('#priceTextUSD').show();
        $('#priceTextGBP').hide();

        $('chartEUR').hide();
        $('chartUSD').show();
        $('chartGBP').hide();
    } else if (choice == 2) {
        $('#priceTextEUR').hide();
        $('#priceTextUSD').hide();
        $('#priceTextGBP').show();

        $('chartEUR').hide();
        $('chartUSD').hide();
        $('chartGBP').show();
    }
}

function updateChart() {
    $.getJSON("https://api.coindesk.com/v1/bpi/currentprice.json", function (data) {
        var date = new Date(data.time.updated);

        $('#priceTextEUR').text(data.bpi.EUR.rate_float.toFixed(2) + " €");
        $('#priceTextUSD').text(data.bpi.USD.rate_float.toFixed(2) + " $");
        $('#priceTextGBP').text(data.bpi.GBP.rate_float.toFixed(2) + " £");

        chartEUR.updateSeries([{
            data: [
                ...chartEUR.w.config.series[0].data,
                [date.getTime(), data.bpi.EUR.rate_float]
            ]
        }]);

        chartUSD.updateSeries([{
            data: [
                ...chartUSD.w.config.series[0].data,
                [date.getTime(), data.bpi.USD.rate_float]
            ]
        }]);

        chartGBP.updateSeries([{
            data: [
                ...chartGBP.w.config.series[0].data,
                [date.getTime(), data.bpi.GBP.rate_float]
            ]
        }]);

        setTimeout(function () { updateChart() }, 10000);
    });
}