var final = [];

function generatePieMonths(months, monthsIndex) {
    let displayedLabel = [];
    for (let i = 0; i < monthsIndex.length; i++) {
        displayedLabel.push(months[monthsIndex[i] - 1]);
    }
    return displayedLabel;
}


function createPieChart(months, values) {
    var ctx2 = document.getElementById("pieChart");
    var pieChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: months,
            datasets: [{
                backgroundColor: ["#3e21cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#99ccff", "#99ff66", "#d65cad", "#0077b3", "#666666", "#cccc00", "#660033", "#ff0080", "#ac7339"],
                data: values
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Statistica somajului in perioada in perioada Ianuarie 2019 - Martie 2020 (Datele pentru luna august 2019 nu sunt puse la dispozitie pe site-ul guvernului.)'
            }
        }
    });
}

var id_judet = 15;
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

        let displayedLabel = generatePieMonths(months, monthIndex);
        createPieChart(displayedLabel, values);
    });