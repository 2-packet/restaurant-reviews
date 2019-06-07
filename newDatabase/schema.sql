DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE restaurants (
  id                serial primary key unique,
  location          varchar(30), 
  noise             varchar(10),
  recommendpercent  int,
  averageoverall    numeric,
  averageservice    numeric,
  averageambience   numeric,
  averagefood       numeric,
  valuerating       numeric
);

\copy restaurants(id,location,noise,recommendpercent,averageoverall,averageservice, averageambience, averagefood, valuerating) FROM './restaurants.csv' DELIMITER '|' CSV;

CREATE TABLE diners (
  id            serial primary key unique,
  firstname     varchar(30),
  lastname      varchar(30),
  city          varchar(30),
  avatarcolor   varchar(10),
  isvip         boolean
);
\copy diners(id, firstname, lastname, city, avatarcolor, isvip) FROM './diners.csv' DELIMITER '|' CSV;

CREATE TABLE reviews (
  id              serial primary key unique,
  restaurant      int,
  diner           int,
  text            varchar(1000),
  date            date,
  overall         int,
  food            int,
  service         int,
  ambience        int,
  wouldrecommend  boolean,
  tags            varchar(100),
  foreign key (diner) references diners(id),
  foreign key (restaurant) references restaurants(id)
);
\copy reviews(id,restaurant,diner,text,date,overall,food,service,ambience,wouldrecommend,tags) FROM './reviews.csv' DELIMITER '|' CSV;


