export let stockPrices = [];
export let transactions = [];
export let balance = 10000000.00;
export let profit = 0;

export function changeBalance(val) {
    balance += val;
}

export function changeProfit(val) {
    profit += val;
}

export function transactionPutter(buyPrice, sellPrice, tradeProfit) {
    transactions.push(JSON.stringify({
        "buyPrice": buyPrice,
        "sellPrice": sellPrice,
        "profit": tradeProfit,
        "balance": balance
    }));
};
