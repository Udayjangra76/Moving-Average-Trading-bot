import express from 'express';
import { getStockPrices } from './dataFetch.js';
import { balance, profit, transactions } from './data.js';
const app = express();
const PORT = 3000;
import { MVCstrategy } from './MovingAverageCrossover.js';
function startBot(strategy) {
    setInterval(async () => {
        const data = await getStockPrices();
        const newPrice = parseInt(data.price);
        if (newPrice) {
            strategy(newPrice);
        }
    }, 1000)
}

app.get('/', async function (req, res) {
    res.send({
        "balance": balance,
        "profit": profit
    });
})

app.get('/transaction', function (req, res) {
    res.send(transactions);
})

startBot(MVCstrategy);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});