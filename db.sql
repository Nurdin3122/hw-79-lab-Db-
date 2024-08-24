create database office collate utf8mb4_general_ci;
use office;

create table categories (
    id int auto_increment primary key,
    name varchar(255) not null,
    description text
);

create table locations (
    id int auto_increment primary key,
    name varchar(255) not null,
    description text
);

create table items (
    id int auto_increment primary key,
    category_id int not null,
    location_id int not null,
    name varchar(255) not null,
    description text,
    image varchar(255) null,
    created_at datetime default current_timestamp null,
    foreign key (category_id) references categories(id),
    foreign key (location_id) references locations(id)
);
