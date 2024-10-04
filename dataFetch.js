
import axios from 'axios';
export const getStockPrices = async () => {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        return response.data;
    } catch (error) {
        console.error('Error fetching stock prices:', error);
    }
};