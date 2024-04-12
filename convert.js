// you will need node.js installed and run program in terminal
// "$cd <path>" and then "$node convert.js" to execute


// that EXTRA code to get user input from console
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
//////////////////////////////////////////

// question() is a built-in method of readline
// 2 arguments: question to be displayed and the callback function that will take the input parameter
rl.question("Enter temperature in Celsius: ", (input) => {
  const fahrenheit = (input * 9/5) + 32;
  // using `` lets you print non-string values as strings without all that concatenation
  console.log(`${input}°C is equal to ${fahrenheit}°F`);
  
  rl.close();
});