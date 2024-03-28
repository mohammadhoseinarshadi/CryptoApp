import React from 'react';
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from './CoinDetails.module.css';

const CoinDetails = () => {
  const { coinId } = useParams();
  const location = useLocation();
  const [coinData, setCoinData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className={styles.coinDetails}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Coin Details</h1>
        {coinData && (
          <div className={styles.details}>
            <h2 className={styles.name}>{coinData.name} ({coinData.symbol.toUpperCase()})</h2>
            <p className={styles.price}>Current Price: {coinData.market_data.current_price.usd}</p>
            {/* Add more details as needed */}

            {/* Chart */}
            <div className={styles.chartContainer}>
              <h3 className={styles.chartTitle}>Price History</h3>
              {coinData.market_data.sparkline_7d && (
                <LineChart width={600} height={300} data={coinData.market_data.sparkline_7d.price}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              )}
            </div>
            
            {/* Live Price */}
            <div className={styles.livePrice}>
              <h3 className={styles.livePriceTitle}>Live Price</h3>
              <p className={styles.livePriceValue}>$ {coinData.market_data.current_price.usd}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CoinDetails;
