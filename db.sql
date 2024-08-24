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
    created_at datetime default (NOW()); null,
    foreign key (category_id) references categories(id),
    foreign key (location_id) references locations(id)
);

 INSERT INTO items (category_id, location_id, name, description, image, created_at) VALUES (
 1, 1, 'Офисный стол', 'Стол для офисной работы', 'стол.jpg' '2024-08-24 07:35:51'
 );
 INSERT INTO items (category_id, location_id, name, description, image, created_at) VALUES (
 2, 2, 'Ноут', 'для работы', 'ноут.jpg' '2024-08-24 08:14:51'
 );
