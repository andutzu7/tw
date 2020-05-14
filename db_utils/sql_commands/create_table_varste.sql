create table varste(
    id_judet int,
    sub25 int,
    interval25_29 int,
    interval30_39 int,
    interval40_49 int,
    interval50_55 int,
    peste55 int,
    an int,
    luna int,
    primary key (id_judet, an, luna)
);
