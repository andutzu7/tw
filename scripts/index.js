
api_url = 'https://arcane-sierra-19327.herokuapp.com'
//valid_table_names = ['varste', 'medii', 'educatie', 'rata', 'judete']

table_name = 'varste'

fetch(`${api_url}/${table_name}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for(let row of data){
        console.log(row); //do stuff with row
    }
  });