
fetch('http://127.0.0.1:3000/rata')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for(let row of data){
        console.log(row); //do stuff with row
    }
  });