// console.log("Let's get started!");

const meal = {
  price: 30,
  id: 1,
  location: "hbo",
};

const { price, ...restProperties } = meal;

// console.log(restProperties);

const myObj = {
  a: 1,
  b: 2,
  c: 3,
};

const { a, b, c, d = "default" } = myObj;
// console.log(d);

// defaulting when you are destructuring;

const reviews = [
  4.5, 4.0, 5.0, 2.0, 1.0, 5.0, 3.0, 4.0, 1.0, 5.0, 4.5, 3.0, 2.5, 2.0,
];

const results = reviews.reduce(function (accumulator, increment) {
  return accumulator[increment]
    ? { ...accumulator, [increment]: accumulator[increment] + 1 }
    : { ...accumulator, [increment]: 1 };
}, {});

const res = reviews.reduce((acc, inc) => {
  const count = acc[inc] || 0;
  return {
    ...acc,
    [inc]: count + 1,
  };
}, {});

console.log(results);
console.log("res", res);
