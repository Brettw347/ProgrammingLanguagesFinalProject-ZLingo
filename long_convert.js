// converts Celsius to Fahrenheit. Recursively executes until user types 'done'. Prints all previous entries to console before quitting
// this converter includes a class, an array, and a for loop

const readline = require('readline');

class TemperatureConverter {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.conversions = [];
  }

  celsiusToFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
  }

  displayConversions() {
    console.log('Previous conversions:');
    // using a for loop to iterate over the conversions array
    for (let i = 0; i < this.conversions.length; i++) {
      console.log(this.conversions[i]);
    }
  }

  convertTemperature() {
    this.rl.question('Enter the temperature in Celsius (e.g., 25), or "done" to finish: ', (input) => {
      if (input.toLowerCase() === 'done') {
        this.displayConversions();
        this.rl.close();
        return;
      }

      // converts STRING input to a FLOAT, and assigns it to var temperature
      const temperature = parseFloat(input);

      if (isNaN(temperature)) {
        console.log('Invalid input. Please provide a valid temperature in Celsius.');
        this.convertTemperature();
        return;
      }

      const convertedTemperature = this.celsiusToFahrenheit(temperature);
      console.log(`${temperature} Celsius is equal to ${convertedTemperature.toFixed(2)} Fahrenheit.`);

      // store the conversion in the array
      this.conversions.push(`${temperature}C => ${convertedTemperature.toFixed(2)}F`);

      // recursively call the function to ask for the next input
      this.convertTemperature();
    });
  }
}

// create an instance of TemperatureConverter and start asking for user input
const temperatureConverter = new TemperatureConverter();
temperatureConverter.convertTemperature();