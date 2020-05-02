var final = [];

function generateMonths(months, monthsIndex) {
    let displayedLabel = [];
    for (let i = 0; i < monthsIndex.length; i++) {
        displayedLabel.push(months[monthsIndex[i] - 1]);
    }
    return displayedLabel;
}

function createChart(months, values) {
    var ctx = document.getElementById("myChart");
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
                backgroundColor: "rgba(0,0,0,0.1)",
                data: values,
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

var id_judet = 1;
var months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var values = [];
var monthIndex = [];
let api_url = 'https://arcane-sierra-19327.herokuapp.com'
//valid_table_names = ['varste', 'medii', 'educatie', 'rata', 'judete']

let table_name = 'rata';

fetch(`${api_url}/${table_name}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        for (let row of data) {
            if (row['id_judet'] === id_judet) {
                final.push(row);
                values.push(row['total']);//this has to be implemented in the gui
                if (row['luna'] !== 12)
                    monthIndex.push(row['luna'] % 12);
                else
                    monthIndex.push(12);
            }
        }

        let displayedLabel = generateMonths(months, monthIndex);
        createChart(displayedLabel, values);
    });
