create table educatie(
    judet varchar(32),
    total int,
    fara_studii int,
    primar int,
    gimnazial int,
    liceal int,
    postliceal int,
    profesional int,
    universitar int,
    an int,
    month int,
    primary key (judet, an, month)
);



