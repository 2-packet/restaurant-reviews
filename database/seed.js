const Faker = require('faker');
const { Client } = require('pg');
const squel = require('squel');
const moment = require('moment');
const dbconf = require('../config/db_config.js');

const Seed = {
  foodWords: ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine'],
  tagWords: ['groups', 'kids', 'gluten free', 'vegan'],
  noiseLevels: ['Quiet', 'Average', 'Loud'],
  colors: ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'],
  getRandomFoodWord() {
    return Seed.foodWords[Math.floor(Math.random() * Seed.foodWords.length)];
  },
  getRandomTagWord() {
    return Seed.tagWords[Math.floor(Math.random() * Seed.tagWords.length)];
  },
  getRandomNoiseLevel() {
    return Seed.noiseLevels[Math.floor(Math.random() * Seed.noiseLevels.length)];
  },
  getRandomColor() {
    return Seed.colors[Math.floor(Math.random() * Seed.colors.length)];
  },
  lowProbabilityRandom() {
    return Math.random() > 0.8;
  },
  all() {
    const restaurants = Seed.createRestaurants();
    const diners = Seed.createDiners();
    const reviews = Seed.createReviews();
    const client = new Client({
      user: dbconf.role,
      host: dbconf.host,
      database: 'reviews',
      password: dbconf.password,
      port: 5432
    });
    client.connect();
    Seed.insertRestaurants(restaurants, (err, res) => {
      console.log('inserting restaurants...');
      if (err) {
        console.log(err);
        client.end();
      } else {
        Seed.insertDiners(diners, (err, res) => {
          console.log('inserting diners...');
          if (err) {
            console.log(err);
            client.end();
          } else {
            Seed.insertReviews(reviews, (err, res) => {
              console.log('inserting reviews...');
              if (err) {
                console.log(err);
              }
              client.end();
            });
          }
        });
      }
    });
  },
  createRestaurants() {
    //  create 5 restaurants
    const restaurants = [];
    for (let i = 0; i < 5; i++) {
      const restaurant = {};
      restaurant.name = Faker.lorem.word();
      restaurant.location = Faker.address.city().replace(/'/g, '');
      restaurant.noise = Seed.getRandomNoiseLevel();
      restaurant.location = Faker.address.city().replace(/'/g, '');
      restaurant.averageoverall = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 }));
      restaurant.averageservice = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 }));
      restaurant.averageambience = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 }));
      restaurant.averagefood = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 }));
      restaurant.valuerating = Seed.fixFloatPrecision(Faker.random.number({ min: 0, max: 5, precision: 0.1 }));
      restaurant.recommendpercent = Faker.random.number({ min: 0, max: 100 });
      restaurants.push(restaurant);
    }
    return restaurants;
  },
  fixFloatPrecision(float) {
    let number = float;
    if (typeof float !== 'string') {
      number = float.toString();
    }
    number = number.split('.');
    if (number[1]) {
      if (number[1].slice(0, 1) === '0') {
        return number[0];
      }
      return `${number[0]}.${number[1].slice(0, 1)}`;
    }
    return number[0];
  },
  createDiners() {
    //  create 50 diners
    const diners = [];
    for (let i = 0; i < 50; i++) {
      const diner = {};
      diner.firstname = Faker.name.firstName().replace(/'/g, '');
      diner.lastname = Faker.name.lastName().replace(/'/g, '');
      diner.city = Faker.address.city().replace(/'/g, '');
      diner.totalreviews = Faker.random.number({ min: 0, max: 25 });
      diner.avatarcolor = Seed.getRandomColor();
      diner.isVIP = Seed.lowProbabilityRandom();
      // write diner
      diners.push(diner);
    }
    return diners;
  },
  createReviews() {
    //  create 600 reviews
    const reviews = [];
    for (let i = 0; i < 600; i++) {
      const review = {};
      review.restaurant = Faker.random.number({ min: 1, max: 5 });
      review.diner = Faker.random.number({ min: 1, max: 50 });
      review.text = Faker.lorem.sentences();
      if (Math.random() > 0.7) {
        review.text += ` ${Faker.lorem.sentences()}`;
      }
      review.date = moment(Faker.date.recent(365)).format('YYYY-MM-DD');
      review.overall = Faker.random.number({ min: 1, max: 5 });
      review.food = Faker.random.number({ min: 1, max: 5 });
      review.service = Faker.random.number({ min: 1, max: 5 });
      review.ambience = Faker.random.number({ min: 1, max: 5 });
      review.wouldrecommend = Faker.random.boolean();
      review.tags = '';
      for (let j = 0; j < 2; j++) {
        if (Math.random() > 0.8) {
          if (review.tags[0]) {
            review.tags += ',';
          }
          review.tags += Seed.getRandomFoodWord();
          if (Math.random() > 0.9) {
            review.tags += `,${Seed.getRandomTagWord()}`;
          }
        }
      }
      reviews.push(review);
    }
    return reviews;
  },
  insertRestaurants(restaurants, callback) {
    //  insert 5 restaurants
    const client = new Client({
      user: dbconf.role,
      host: dbconf.host,
      database: 'reviews',
      password: dbconf.password,
      port: 5432
    });
    const sql = squel.insert()
      .into('restaurants')
      .setFieldsRows(restaurants)
      .toString();
    client.connect();
    client.query(sql, (err, res) => {
      if (err) {
        callback(err.stack);
        client.end();
      } else {
        callback(null, res.rows[0]);
        client.end();
      }
    });
  },
  insertDiners(diners, callback) {
    //  insert 50 diners 
    const client = new Client({
      user: dbconf.role,
      host: dbconf.host,
      database: 'reviews',
      password: dbconf.password,
      port: 5432
    });
    const sql = squel.insert()
      .into('diners')
      .setFieldsRows(diners)
      .toString();
    client.connect();
    client.query(sql, (err, res) => {
      if (err) {
        callback(err.stack);
        client.end();
      } else {
        callback(null, res.rows[0]);
        client.end();
      }
    });
  },
  insertReviews(reviews, callback) {
    //  insert 100 reviews
    const client = new Client({
      user: dbconf.role,
      host: dbconf.host,
      database: 'reviews',
      password: dbconf.password,
      port: 5432
    });
    const sql = squel.insert()
      .into('reviews')
      .setFieldsRows(reviews)
      .toString();
    client.connect();
    client.query(sql, (err, res) => {
      if (err) {
        callback(err.stack);
        client.end();
      } else {
        callback(null, res.rows[0]);
        client.end();
      }
    });
  }
};

Seed.all();
