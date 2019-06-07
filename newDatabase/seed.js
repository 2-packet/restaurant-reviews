const faker = require('faker');
const fs = require('fs');
const moment = require('moment');

const NUM_RESTAURANTS = 10000000;
const NUM_DINERS = 10000000;
const NUM_REVIEWS = NUM_RESTAURANTS * 3;

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
  }
};

// Write the data to the supplied writable stream N million times.
// manage build up of write stream buffer
const writeNTimes = (writer, dataGenerator, encoding, callback, times) => {
  let id = times;
  write();
  function write() {
    let ok = true;
    do {
      const data = dataGenerator(id).concat('\n');
      id --;
      if (id === 0) {
        // last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (id > 0 && ok);
    if (id > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
};

const createReview = (id) => {
  const restaurant = Math.floor(Math.random() * NUM_RESTAURANTS) + 1;
  const diner = Math.floor(Math.random() * NUM_DINERS) + 1;
  const text = faker.lorem.sentence();
  const date = moment().format('YYYY-MM-DD');
  const overall = Math.floor(Math.random() * 5) + 1;
  const food = Math.floor(Math.random() * 5) + 1;
  const service = Math.floor(Math.random() * 5) + 1;
  const ambience = Math.floor(Math.random() * 5) + 1;
  const wouldrecommend = Math.random() < 0.5;
  const tags = [Seed.getRandomFoodWord()];
  for (let j = 0; j < 2; j++) {
    if (Math.random() > 0.8) {
      tags.push(Seed.getRandomFoodWord())
      if (Math.random() > 0.9) {
        tags.push(Seed.getRandomTagWord())
      }
    }
  }
  const reviewData = [];
  reviewData.push(
    id,
    restaurant,
    diner,
    text,
    date,
    overall,
    food,
    service,
    ambience,
    wouldrecommend,
    tags.join(',')
  );

  return reviewData.join('|');
};

const createRestaurant = (id) => {
  const location = faker.address.city().replace(/'/g, '');
  const noise = Seed.getRandomNoiseLevel();
  const averageoverall = Seed.fixFloatPrecision(faker.random.number({ min: 0, max: 5, precision: 0.1 }));
  const averageservice = Seed.fixFloatPrecision(faker.random.number({ min: 0, max: 5, precision: 0.1 }));
  const averageambience = Seed.fixFloatPrecision(faker.random.number({ min: 0, max: 5, precision: 0.1 }));
  const averagefood = Seed.fixFloatPrecision(faker.random.number({ min: 0, max: 5, precision: 0.1 }));
  const valuerating = Seed.fixFloatPrecision(faker.random.number({ min: 0, max: 5, precision: 0.1 }));
  const recommendpercent = Math.floor(Math.random() * 100);

  const restaurantData = [];
  restaurantData.push(
    id,
    location,
    noise,
    recommendpercent,
    averageoverall,
    averageservice,
    averageambience,
    averagefood,
    valuerating
  );

  return restaurantData.join('|');
};

const createDiner = (id) => {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const city = faker.address.city();
  const avatarcolor = Seed.getRandomColor();
  const isVIP = Math.random() < 0.2;

  const dinerData = [];
  dinerData.push(
    id,
    firstname,
    lastname,
    city,
    avatarcolor,
    isVIP
  );

  return dinerData.join('|');
};

const reviewsWriteStream = fs.createWriteStream('reviews.csv');
const dinersWriteStream = fs.createWriteStream('diners.csv');
const restaurantsWriteStream = fs.createWriteStream('restaurants.csv');


// initial seeding parameters below
writeNTimes(reviewsWriteStream, createReview, 'utf8', () => console.log('created reviews'), NUM_REVIEWS);
writeNTimes(dinersWriteStream, createDiner, 'utf8', () => console.log('created diners'), NUM_DINERS);
writeNTimes(restaurantsWriteStream, createRestaurant, 'utf8', () => console.log('created restaurants'), NUM_RESTAURANTS);