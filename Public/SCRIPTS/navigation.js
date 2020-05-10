let svg = document.getElementById('romanian_map');

function set_county_on_click_events(){
    for (let i = 1; i <= 42; i++) {
        let country = document.getElementById(`JUDET_SVG_${i}`);
        country.onclick = function changeContent() {
            svg.style.display='none';
            let country_barchart = document.getElementById('countryBarChart');
            country_barchart.style.visibility='visible';

            let country_piechart = document.getElementById('countryPieChart');
            country_piechart.style.visibility='visible';

            let country_textbox = document.getElementById('countryTextbox');
            country_textbox.style.visibility='visible';

            let country_backButton = document.getElementById('countryBackButton');
            country_backButton.style.visibility='visible';
        };
    }
}

function back_button_on_click(){
    let country_backButton = document.getElementById('countryBackButton');
    country_backButton.onclick = function changeContent() {
        svg.style.display='block';
        let country_barchart = document.getElementById('countryBarChart');
        country_barchart.style.visibility='hidden';
    
        let country_piechart = document.getElementById('countryPieChart');
        country_piechart.style.visibility='hidden';
    
        let country_textbox = document.getElementById('countryTextbox');
        country_textbox.style.visibility='hidden';
    
        let country_backButton = document.getElementById('countryBackButton');
        country_backButton.style.visibility='hidden';
    }
}


set_county_on_click_events();
back_button_on_click();