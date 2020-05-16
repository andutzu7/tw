create table rata(
    id_judet int,
    total int,
    total_femei int,
    total_barbati int,
    indemnizati int,
    neindemnizati int,
    procent_total float,
    procent_femei float,
    procent_barbati float,
    an int,
    luna int,
    primary key (id_judet, an, luna)
);