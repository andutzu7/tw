create table rata(
    judet varchar(32),
    total int,
    total_femei int,
    total_barbati int,
    insdemnizati int,
    neindemnizati int,
    procent_total float,
    procent_femei float,
    procent_barbati float,
    an int,
    month int,
    primary key (judet, an, month)
);