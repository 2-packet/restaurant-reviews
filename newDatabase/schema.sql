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

CREATE TABLE diners (
  id            serial primary key unique,
  firstname     varchar(30),
  lastname      varchar(30),
  city          varchar(30),
  avatarcolor   varchar(10),
  isvip         boolean,
  totalreviews  int
);

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

