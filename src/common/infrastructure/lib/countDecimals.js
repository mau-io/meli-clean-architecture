export default function countDecimals(value) {
  if (Math.floor(value) === value || isNaN(value)) {
    return 0;
  } else {
    // Convert number to string
    let valueString = value.toString();

    // Split the string by "."
    let splitValue = valueString.split('.');

    // Get the decimal part
    let [, decimalPart] = splitValue;

    // Return the length of decimal part or 0 if it is undefined
    return decimalPart ? decimalPart.length : 0;
  }
}