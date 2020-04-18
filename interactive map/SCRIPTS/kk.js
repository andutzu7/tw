// selectam svg-ul
let svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

//creem path-ul
let path = d3.geoPath();

//folosim o proiectie de tip mercator ca sa fie harta flat*
let projection = d3.geoMercator()
    .scale(1500)
    .center([25, 45 ])
    .translate([width / 2, height / 2]);

/*Preluam fisierele json. Folosim queue ptc putem executa asincron mai multe
taskuri si putem primi usor feedback in caz de erori
    //d3 json parseaza fisierul json"(in cazul nostru este un geojson)
    //d3 csv functioneaza in modul urmator. Parseaza csv ul pe linii, apoi trebuie
    //specificata o functie cu un parametru d pentru prelucrarea randului.
    // Dupa executarea comenzilor firul de executie este trimis catre callbackm, functia ready
    //care primeste ca param. o eroare si un geojson pe care il proiecteaza si coloreaza(ready nu e fct implicita)

* */
d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/romania.geojson")
    .await(ready);

/*
Functia are mai multe atributii:
 -deseneaza harta luand fiecare element de tip path din geojson
 (geojson sunt templetizate si contin by default path-uri)
 Path urile le extrage din argumentul topo,generat de queue(le ia deci din
 geojsonul parsat din sursa specificata)
 Fct enter() este folosita pt a adauga noi elemente la obiectul actual(svg)
 In cazul in care aceasta nu este specificata nu se creeaza campuri noi
* */
function ready(error, topo) {

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(projection)
        )

}
