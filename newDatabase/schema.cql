
CREATE KEYSPACE rms  with replication = {'class':'SimpleStrategy','replication_factor':3} ;

USE rms;

CREATE TABLE restaurantSummary(
  id                int PRIMARY KEY,
  location          text, 
  noise             text,
  recommendpercent  float,
  averageoverall    float,
  averageservice    float,
  averageambience   float,
  averagefood       float,
  valuerating       float
);

CREATE TABLE restaurantReviews(
    id              int PRIMARY KEY,
    restaurantId    int,
    text            text,
    date            timestamp,
    overall         float,
    food            float,
    service         float,
    ambience        float,
    wouldRecommend  Boolean,
    tags            text,
    userId          int,
    userFirstName   text,
    userLastName    text,
    userCity        text,
    userAvatarColor text,
    userIsVip       Boolean,
);

copy restaurantSummary (id, location, noise, recommendpercent, averageoverall, averageservice, averageambience, averagefood, valuerating) from './cassandraRestaurants.csv' WITH delimiter = '|';

copy restaurantReviews (id, restaurantId, text, date,overall, food,service,ambience,wouldRecommend,tags,userId,userFirstName,userLastName,userCity,userAvatarColor,userIsVip) from './cassandraReviews.csv' with delimiter = '|';

create index rev_idx ON restaurantReviews (restaurantId);
