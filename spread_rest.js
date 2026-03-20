// spread and rest operators

const fruit = ["apple", "banana", "cherry", "pears"];
const fruitCopy = fruit;

const fruitSpread = [...fruit];

fruit.push("grape");

// console.log(`original: ${fruit}`);
// console.log(`copy:${fruitCopy}`);
// console.log(`spread:${fruitSpread}`);

const veggies = ["lettuce", "carrot", "broccoli", "asparagus"];

const platter = [...fruit, ...veggies];

// console.log(platter);

let user = { id: 1, name: "Jatthew", role: "dork" };
let userCopy = user;

let userOrigin = { ...user };
userCopy.role = "Dork Supreme";

// console.log(user);
// console.log(userCopy);
// console.log(userOrigin);

let temp = { id: 67, user_name: "Jimothy", role: "pleb" };
const { id, user_name, ...theRest } = temp;

// console.log(id);
// console.log(theRest);
