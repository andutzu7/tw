create table medii(
    id_judet int,
    urban_femei int,
    urban_barbati int,
    rural_femei int,
    rural_barbati int,
    an int,
    luna int,
    primary key (id_judet, an, luna)
);

