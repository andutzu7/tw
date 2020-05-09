var Final = [];

function generateBarMonths(months, monthsIndex) {
    let displayedLabel = [];
    for (let i = 0; i < monthsIndex.length; i++) {
        displayedLabel.push(months[monthsIndex[i] - 1]);
    }
    return displayedLabel;
}

function createBarChart(months, values,chartNameID) {
    var ctx = document.getElementById(chartNameID);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: "Numar total someri ",
                type: "line",
                borderColor: "#8e5ea2",
                data: values,
                fill: false
            }, {
                label: "Numar total someri",
                type: "bar",
                backgroundColor: "rgba(255, 0, 255 , 0.15)",
                data: values,
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display:false
            },
            title: {
                display: true,
                text: 'Statistica somajului in perioada in perioada Ianuarie 2019 - Martie 2020* '//this label has to also be changed to be reusable:)))
            }, scales: {
                xAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            if (index < 11)
                                return value + ' 2019';
                            else
                                return value + '2020';
                        }
                    }, scaleLabel: {
                        display: true,
                        labelString: '*Datele pentru luna august 2019 nu sunt puse la dispozitie pe site-ul guvernului.'
                    }
                }
                ]
            }
        }
    });
}

var ID_judet = 23;
var Months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var Values = [];
var MonthIndex = [];
let API_URL = 'https://arcane-sierra-19327.herokuapp.com'
//valid_TABLE_NAMEs = ['varste', 'medii', 'educatie', 'rata', 'judete']

let TABLE_NAME = 'varste';

fetch(`${API_URL}/${TABLE_NAME}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        for (let row of data) {
            if (row['id_judet'] === ID_judet) {
                Final.push(row);
                Values.push(row['interval25_29']);//this has to be implemented in the gui
                if (row['luna'] !== 12)
                    MonthIndex.push(row['luna'] % 12);
                else
                    MonthIndex.push(12);
            }
        }
        let displayedLabel = generateBarMonths(Months, MonthIndex);
        createBarChart(displayedLabel, Values,"lineBarChart");
        createBarChart(displayedLabel, Values,"countryBarChart");

    });
