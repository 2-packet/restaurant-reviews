const { Pool } = require('pg');
// const squel = require('squel');
const dbconf = require('../config/db_config.js');
const pool = new Pool({
  user: 'postgres',
  host: 'ec2-54-215-249-250.us-west-1.compute.amazonaws.com',
  database: 'mydb',
  password: 'life',
  port: 5432
});

const makeQuery = (pool, sql, callback) => {
  // console.log(sql);
  // pool.connect()
    // .then(() => {
      pool.query(sql)
        .then((res) => {
          callback(null, res.rows);
          // pool.end();
        })
        .catch((err) => {
          callback(err);
          // pool.end();
        });
    // })
    // .catch((err) => {
    //   callback(err);
    //   // pool.end();
    // });
};

module.exports.getAllReviews = (restaurantId, callback) => {
  // const pool = new Pool({
  //   user: dbconf.role,
  //   host: dbconf.host,
  //   database: 'reviews',
  //   password: dbconf.password,
  //   port: 5432
  // });

  const sql = `SELECT 
    reviews.id, 
    reviews.restaurant,
    reviews.text,
    reviews.date,
    reviews.overall,
    reviews.food,
    reviews.service,
    reviews.ambience,
    reviews.wouldrecommend,
    reviews.tags,
    diners.firstname,
    diners.lastname,
    diners.city,
    diners.avatarcolor,
    diners.isvip
    from reviews INNER JOIN diners 
    on (reviews.diner = diners.id)
    and reviews.restaurant = ${restaurantId}`;


  makeQuery(pool, sql, callback);
};

module.exports.getSummary = (restaurantId, callback) => {
  // get restaurant summary info from restaurant table
  // const pool = new pool({
  //   user: dbconf.role,
  //   host: dbconf.host,
  //   database: 'reviews',
  //   password: dbconf.password,
  //   port: 5432
  // });
  const sql = `SELECT 
    restaurants.location,
    restaurants.noise,
    restaurants.recommendpercent,
    restaurants.averageoverall,
    restaurants.averageservice,
    restaurants.averageambience,
    restaurants.averagefood,
    restaurants.valuerating
    from restaurants where id = ${restaurantId}`;
  // squel.select()
  //   .from('restaurants')
  //   .field('restaurants.location')
  //   .field('restaurants.noise')
  //   .field('restaurants.recommendpercent', 'recommendPercent')
  //   .field('restaurants.valuerating', 'valueRating')
  //   .field('restaurants.averageoverall', 'averageOverall')
  //   .field('restaurants.averagefood', 'averageFood')
  //   .field('restaurants.averageambience', 'averageAmbience')
  //   .field('restaurants.averageservice', 'averageService')
  //   .where(`id = ${restaurantId}`)
  //   .toString();
  makeQuery(pool, sql, callback);
};
