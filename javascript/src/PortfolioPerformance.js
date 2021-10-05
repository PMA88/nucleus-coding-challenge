const prices = [
  { effectiveDate: new Date(2021, 8, 1, 5, 0, 0), price: 35464.53 },
  { effectiveDate: new Date(2021, 8, 2, 5, 0, 0), price: 35658.76 },
  { effectiveDate: new Date(2021, 8, 3, 5, 0, 0), price: 36080.06 },
  { effectiveDate: new Date(2021, 8, 3, 13, 0, 0), price: 37111.11 },
  { effectiveDate: new Date(2021, 8, 6, 5, 0, 0), price: 38041.47 },
  { effectiveDate: new Date(2021, 8, 7, 5, 0, 0), price: 34029.61 },
];

const transactions = [
  { effectiveDate: new Date(2021, 8, 1, 9, 0, 0), value: 0.012 },
  { effectiveDate: new Date(2021, 8, 1, 15, 0, 0), value: -0.007 },
  { effectiveDate: new Date(2021, 8, 4, 9, 0, 0), value: 0.017 },
  { effectiveDate: new Date(2021, 8, 5, 9, 0, 0), value: -0.01 },
  { effectiveDate: new Date(2021, 8, 7, 9, 0, 0), value: 0.1 },
];

export function getDailyPortfolioValues() {
  // Initialise loop variables
  let dailyValue = 0;
  let dailyPrice = 0;
  let dailyValues = []; // dailyValues array to return

  // Get first and last date in range. Set hour for unit test to pass
  const start = new Date(prices[0].effectiveDate.setHours(1));
  const end = new Date(prices[prices.length - 1].effectiveDate.setHours(1));

  // Loop through each day within range
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    // Loop through transactions
    for (let i = 0; i < transactions.length; i++) {
      // If tranasction date matches date in loop
      if (transactions[i].effectiveDate.getDate() == date.getDate()) {
        dailyValue += transactions[i].value; // Then update tracked accumlative daily value
      } else continue;
    }
    // Loop through prices
    for (let i = 0; i < prices.length; i++) {
      // If price date matches date in loop
      if (prices[i].effectiveDate.getDate() == date.getDate()) {
        dailyPrice = prices[i].price; // Then update tracked daily price
      } else continue;
    }
    // Add object into array
    dailyValues.push({
      effectiveDate: new Date(date),
      value: Math.round(dailyValue * dailyPrice * 1e5) / 1e5, // Round value number for unit test to pass
    });
  }
  return dailyValues; // Return full array of objects
}
