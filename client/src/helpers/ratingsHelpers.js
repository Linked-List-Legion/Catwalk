import {
  emptyStar, fullStar, quarterStar, halfStar, threeQuarterStar,
} from './starRatings';

// creating array of dynamicly filled stars based on review rating
export const createStarArray = (rating) => {
// get whole number and percent number
  const fullStars = Math.floor(rating);
  let decimal = (rating % 1).toFixed(1);
  decimal = parseInt(decimal.split('.')[1]);
  let partialStar;
  // 0-1 = no star
  if (decimal < 2) {
    partialStar = (emptyStar);
  }
  // 2-3 = 1/4 star
  if (decimal > 1 && decimal < 4) {
    partialStar = (quarterStar);
  }
  // 4-6 = 1/2 star
  if (decimal > 3 && decimal < 7) {
    partialStar = (halfStar);
  }
  // 7-8 = 3/4 star
  if (decimal > 6 && decimal < 9) {
    partialStar = (threeQuarterStar);
  }
  // 9 = full star
  if (decimal > 8) {
    partialStar = (fullStar);
  }
  // create array for displaying full stars dynamically
  const stars = [];
  for (let i = 1; i <= fullStars; i++) {
    stars.push(fullStar);
  }
  if (stars.length < 5) {
    stars.push(partialStar);
  }
  // check to see if any empty stars need to be added
  if (stars.length < 5) {
    const starsToAdd = 5 - stars.length;
    for (let i = 0; i < starsToAdd; i++) {
      stars.push(emptyStar);
    }
  }
  return stars;
};

// get the average star rating for a review
export const getAvgRating = (allRatings) => {
  const ratings = [];
  let avg = 0;
  for (const key in allRatings) {
    avg += parseInt(key) * parseInt(allRatings[key]);
    ratings.push(parseInt(allRatings[key]));
  }
  const divisor = ratings.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  avg /= divisor;
  return avg.toFixed(1);
};

// get the percent of recommendations for a product
export const getRecommendPercent = (totals = {}) => {
  if (Object.keys(totals).length) {
    const total = parseInt(totals.true) + parseInt(totals.false);
    const recommended = parseInt(totals.true);
    return ((recommended / total) * 100).toFixed(0);
  }
  return 0;
};

// get the percents of star ratings 1 - 5 for a product
export const getStarPercents = (data) => {
  const totals = [];
  const ratings = {
    1: data['1'] || 0,
    2: data['2'] || 0,
    3: data['3'] || 0,
    4: data['4'] || 0,
    5: data['5'] || 0,
  };
  for (const key in ratings) {
    totals.push(parseInt(ratings[key]));
  }
  const total = totals.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const percents = [];
  for (const key in ratings) {
    percents.push({ [key]: ((ratings[key] / total) * 100).toFixed(0), star: key });
  }
  return percents.reverse();
};

// create an object containing all possible descriptions
// for a given characteristic in order from lowes to highest
const getDescriptions = (char) => {
  let descriptions;
  switch (char) {
    case 'Fit':
      descriptions = {
        1: 'Runs tight',
        2: 'Slightly tight',
        3: 'Perfect',
        4: 'Slightly long',
        5: 'Runs long',
      };
      break;
    case 'Length':
      descriptions = {
        1: 'Runs short',
        2: 'Slightly short',
        3: 'Perfect',
        4: 'Slightly long',
        5: 'Runs long',
      };
      break;
    case 'Quality':
      descriptions = {
        1: 'Poor',
        2: 'Below average',
        3: 'What I expected',
        4: 'Pretty great',
        5: 'Perfect',
      };
      break;
    case 'Comfort':
      descriptions = {
        1: 'Uncomfortable',
        2: 'Slightly uncomfortable',
        3: 'Ok',
        4: 'Comfortable',
        5: 'Perfect',
      };
      break;
    case 'Width':
      descriptions = {
        1: 'Too narrow',
        2: 'Slightly narrow',
        3: 'Perfect',
        4: 'Slightly wide',
        5: 'Too wide',
      };
      break;
    case 'Size':
      descriptions = {
        1: 'Too small',
        2: 'Slightly small',
        3: 'Perfect',
        4: 'Slightly large',
        5: 'Too large',
      };
      break;
    default:
      descriptions = {};
  }
  return descriptions;
};

// create an array of characteristic objects containing name and
// descriptions for a set of a given products characteristics
export const getCharacteristicsArray = (chars) => {
  const arr = [];
  for (const key in chars) {
    const descriptions = getDescriptions(key);
    arr.push({
      ...chars[key],
      name: key,
      value: Number(chars[key].value) * 10,
      descriptions,
    });
  }
  return arr;
};
