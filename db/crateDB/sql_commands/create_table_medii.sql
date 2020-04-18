create table medii(
    judet varchar(32),
    urban_femei int,
    urban_barbati int,
    rural_femei int,
    rural_barbati int,
    an int,
    month int,
    primary key (judet, an, month)
);