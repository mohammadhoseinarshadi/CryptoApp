import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

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

  console.log("%c Line:5 🥛 params", "color:#e41a6a", coinId);

  if (!coinData) {
    return <div>Loading...</div>;
  }

  // Prepare data for the chart (e.g., price over time)
  const chartData = {
    labels: coinData.market_data.sparkline_7d ? coinData.market_data.sparkline_7d.price.map((_, index) => index) : [],
    datasets: [
      {
        label: `${coinData.name} Price (7 Days)`,
        data: coinData.market_data.sparkline_7d ? coinData.market_data.sparkline_7d.price : [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h2>{coinData.name} ({coinData.symbol.toUpperCase()})</h2>
      <p>Current Price: ${coinData.market_data.current_price.usd}</p>
      <p>Market Cap Rank: {coinData.market_cap_rank}</p>
      <Line data={chartData} key={coinId} />
    </div>
  );
};

export default CoinDetails;
