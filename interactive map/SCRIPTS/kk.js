function drawMap(data,scaleArray) {
// selectam svg-ul
    let svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

//creem path-ul
    let path = d3.geoPath();

//folosim o proiectie de tip mercator ca sa fie harta flat*
    let projection = d3.geoMercator()
        .scale(5000)
        .center([15, 48])
        .translate([width / 2, height / 2]);


//initializizam un obiect de tip map

    /*Creem color scheme-ul. scaleThreshold e cel mai okay pt harti de tipul
    choropleth pt ca poti sa specifici in domeniu stamp urile pt fiecare nuanta
    * */
    //lambda for generating the range
    let fct = (array, length) => {
        let result = [];
        const min = Math.min(...array);
        let increaseFactor;
        if (min >= 500) {
            increaseFactor = 1000;
        } else
            increaseFactor = 100;
        for (let i = 0; i < length; i++) {
            result.push(min + i * increaseFactor);
        }
        return result;
    };
    let range = fct(scaleArray,12);//12 e pt testing
    console.log(range);
    let colorScale = d3.scaleThreshold()
        .domain(range)
        .range(d3.schemeBuPu[9]);

    /*Preluam fisierele json. Folosim queue ptc putem executa asincron mai multe
    taskuri si putem primi usor feedback in caz de erori
        //d3 json parseaza fisierul json"(in cazul nostru este un geojson)
        //d3 csv functioneaza in modul urmator. Parseaza csv ul pe linii, apoi trebuie
        //specificata o functie cu un parametru d pentru prelucrarea randului.
        // Dupa executarea comenzilor firul de executie este trimis catre callbackm, functia ready
        //care primeste ca param. o eroare si un geojson pe care il proiecteaza si coloreaza(ready nu e fct implicita)

    * */
    d3.queue()
        .defer(d3.json, "https://raw.githubusercontent.com/andutzu7/DATAFORPROJECT/master/romania.geojson")
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
            // draw each country
            .attr("d", d3.geoPath().projection(projection)
            )
            .attr("fill", function (d) {

                d.total = data.get(d.properties.cartodb_id) || 0;

                let v = colorScale(d.total);
                return colorScale(d.total);

            });
    }
}

const api_url = 'https://arcane-sierra-19327.herokuapp.com'
//valid_table_names = ['varste', 'medii', 'educatie', 'rata', 'judete']
const table_name = 'rata';
const luna = 2;//customizabile by user

fetch(`${api_url}/${table_name}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let scaleArray = [];
        let stats = d3.map();
        for (let row of data) {
            if (row['luna'] === luna) {
                scaleArray.push(row['total']);//coloana asta trebue schimbata
                stats.set(row['id_judet'], row['total']);//asta se sch in functie de tabel, de facut un map de string string
            }
        }
        drawMap(stats,scaleArray);

    });
