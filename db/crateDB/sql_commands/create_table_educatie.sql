create table educatie(
    id_judet int,
    total int,
    fara_studii int,
    primar int,
    gimnazial int,
    liceal int,
    postliceal int,
    profesional int,
    universitar int,
    an int,
    luna int,
    primary key (id_judet, an, luna)
);
