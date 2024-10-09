import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated, useTransition } from 'react-spring';

function LivePrices() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const coinIds = [
        'bitcoin', 'ethereum', 'ripple', 'cardano', 'dogecoin', 'polkadot',
        'binancecoin', 'solana', 'uniswap', 'chainlink', 'litecoin', 'stellar'
      ];
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&per_page=12&page=1&sparkline=false`);
      setPrices(response.data);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 }
  });

  const transitions = useTransition(prices, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    keys: coin => coin.id,
  });

  return (
    <animated.div style={fadeIn} className="live-prices">
      <h2>Live Crypto Prices</h2>
      <div className="price-grid">
        {transitions((style, coin) => (
          <animated.div style={style} key={coin.id} className="price-item">
            <img src={coin.image} alt={coin.name} />
            <span className="coin-name">{coin.name}</span>
            <animated.span className="coin-price">
              ${coin.current_price.toFixed(2)}
            </animated.span>
            <animated.span className={`price-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </animated.span>
          </animated.div>
        ))}
      </div>
    </animated.div>
  );
}

export default LivePrices;