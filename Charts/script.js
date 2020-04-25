var months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var values = [1, 1, 8, 9, 3, 2, 1, 0, 8, 9, 3, 2];

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: months,
        datasets: [{
            label: "Dummy",
            type: "line",
            borderColor: "#8e5ea2",
            data: values,
            fill: false
        }, {
            label: "Dummy",
            type: "bar",
            backgroundColor: "rgba(0,0,0,0.2)",
            data: values,
        }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Hello World!'
        },
        legend: {display: false}
    }
});