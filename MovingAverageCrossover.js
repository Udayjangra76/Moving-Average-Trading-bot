
import { stockPrices, changeBalance, changeProfit, transactionPutter } from './data.js';
let boughtPrice = null;

const shortTermPeriod = 5;
const longTermPeriod = 20;

const calculateMovingAverage = (prices, period) => {
    if (prices.length < period) return null;
    const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);
    return sum / period;
};

const updateProfit = (buyPrice, sellPrice) => {
    const tradeProfit = sellPrice - buyPrice;
    changeProfit(tradeProfit);
    changeBalance(sellPrice);
    transactionPutter(buyPrice, sellPrice, tradeProfit);
};

export const MVCstrategy = (newPrice) => {
    stockPrices.push(newPrice);
    if (stockPrices.length > 20) stockPrices.shift();
    const shortTermMA = calculateMovingAverage(stockPrices, shortTermPeriod);
    const longTermMA = calculateMovingAverage(stockPrices, longTermPeriod);
    if (shortTermMA && longTermMA) {
        // console.log(`Short-term MA: ${shortTermMA}, Long-term MA: ${longTermMA}`);
        if (shortTermMA > longTermMA && !boughtPrice) {
            console.log(`Buy signal at price: ${newPrice}`);
            boughtPrice = newPrice;
            changeBalance(-boughtPrice);
        }

        else if (shortTermMA < longTermMA && boughtPrice) {
            console.log(`Sell signal at price: ${newPrice}`);
            updateProfit(boughtPrice, newPrice);
            boughtPrice = null;
        }
    }
};
