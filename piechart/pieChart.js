$(document).ready(function(){
    var ctx = $("#mycanvas").get(0).getContext("2d");

    var data = [
        {
            value: 270,
            color: "cornflowerblue",
            highlight: "lightskyblue",
            label: "Sky Blue"
        },
        {
            value: 80,
            color: "lightgreen",
            highlight: "yellowgreen",
            label: "Lightgreen"
        },
        {
            value: 40,
            color: "orange",
            highlight: "darkorange",
            label: "Orange"
        }
    ];

    var piechart = new Chart(ctx).Pie(data);
});