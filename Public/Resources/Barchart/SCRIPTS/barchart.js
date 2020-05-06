var Final = [];

function generateBarMonths(Months, MonthsIndex) {
    let displayedLabel = [];
    for (let i = 0; i < MonthsIndex.length; i++) {
        displayedLabel.push(Months[MonthsIndex[i] - 1]);
    }
    return displayedLabel;
}

function createBarChart(Months, Values) {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Months,
            datasets: [{
                label: "Numar total someri ",
                type: "line",
                borderColor: "#8e5ea2",
                data: Values,
                fill: false
            }, {
                label: "Numar total someri",
                type: "bar",
                backgroundColor: "rgba(0,0,0,0.1)",
                data: Values,
            }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Statistica somajului in perioada in perioada Ianuarie 2019 - Martie 2020* '//this label has to also be changed to be reusable:)))
            }, scales: {
                xAxes: [{
                    ticks: {
                        callback: function (value, index, Values) {
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

var idJudet = 20;
var Months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var Values = [];
var month_index = [];
let API_url = 'https://arcane-sierra-19327.herokuapp.com'
//valid_tableNames = ['varste', 'medii', 'educatie', 'rata', 'judete']

let tableName = 'varste';

fetch(`${API_url}/${tableName}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        for (let row of data) {
            if (row['idJudet'] === idJudet) {
                Final.push(row);
                Values.push(row['interval25_29']);//this has to be implemented in the gui
                if (row['luna'] !== 12)
                    month_index.push(row['luna'] % 12);
                else
                    month_index.push(12);
            }
        }
        let displayedLabel = generateBarMonths(Months, month_index);
        createBarChart(displayedLabel, Values);
    });
