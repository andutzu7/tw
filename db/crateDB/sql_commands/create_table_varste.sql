create table varste(
    judet varchar(32),
    sub25 int,
    interval25_29 int,
    interval30_39 int,
    interval40_49 int,
    interval50_55 int,
    peste55 int,
    an int,
    month int,
    primary key (judet, an, month)
);