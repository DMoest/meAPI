create table if not exists users (
email varchar(225) not null,
password varchar(60) not null,
unique(email)
);