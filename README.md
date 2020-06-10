# RUnDa
proiect Tehnologii Web UAIC FII 


## URL
https://arcane-sierra-19327.herokuapp.com/view





## Raport
https://arcane-sierra-19327.herokuapp.com/raport

## Prezentare
https://youtu.be/j7XMd1qSlqo


# RUnDa API
###### IMPORTANT


https://blog.heroku.com/app_sleeping_on_heroku

```
When an app on Heroku has only one web dyno and that dyno doesn't receive any traffic 
in 1 hour, the dyno goes to sleep.
When someone accesses the app, the dyno manager will automatically wake up the web dyno 
to run the web process type. This causes a short delay for this first request, but subsequent 
requests will perform normally.
```

## /judete
Returneaza tabelul "judete" din DB, folosim acest endpoint pentru a asigura consistenta numelor judetelor.

### GET

```
[  
  {
    "id":1,
    "nume":"ALBA"

  },
  {
    "id":2,
    "nume":"ARAD"
  },
  ...
]
```


## /rata
Returneaza datele referitoare la rata somajului din ultimele 12 luni.

### GET

```
[   
  {
    "id_judet":1,
    "total":4968,
    "total_femei":2356,
    "total_barbati":2612,
    "indemnizati":2327,
    "neindemnizati":2641,
    "procent_total":2.95,
    "procent_femei":3.04,
    "procent_barbati":2.88,
    "an":2020,
    "luna":4
  },
  ...
]
```


## /educatie
Returneaza datele despre somaj din ultimele 12 luni referitoare la nivelul de educatie.

### GET

```
[  
  {
    "id_judet":1,
    "total":4968,
    "fara_studii":186,
    "primar":863,
    "gimnazial":1415,
    "liceal":1137,
    "postliceal":87,
    "profesional":962,
    "universitar":318,
    "an":2020,
    "luna":4 
  },
  ...
]
```



## /medii
Returneaza datele despre somaj din ultimele 12 luni referitoare la mediile de trai.

### GET

```
[  
  {
    "id_judet":1,
    "urban_femei":1024,
    "urban_barbati":922,
    "rural_femei":1332,
    "rural_barbati":1690,
    "an":2020,
    "luna":4
  },
  ...
]
```


## /varste
Returneaza datele despre somaj din ultimele 12 luni referitoare la varsta.

### GET

```
[  
  {
    "id_judet":1,
    "sub25":306,
    "interval25_29":302,
    "interval30_39":1022,
    "interval40_49":1424,
    "interval50_55":972,
    "peste55":942,
    "an":2020,
    "luna":4
  },
  ...
]
```


## /dev/reload_db
Microserviciul care colecteaza date si updateaza DB-ul face un request la acest endpoint pentru a notifica API-ul ca exista date noi in baza de date si cache-ul trebuie reactualizat.

### POST

```
  200, OK
```




# Autori

* Ciobanu Teofil-Constantin
* Vavilov Andrei
* Mocanu Octavian
