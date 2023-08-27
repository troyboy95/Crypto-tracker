import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/Api';
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';
import CircularProgress from '@mui/material/CircularProgress'

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([])

    const { currency, symbol } = CryptoState()

    const fetchTrendingCoins = async () => {
       const {data} = await axios.get(TrendingCoins(currency))
       setTrending(data)
    }

    // console.log(trending)

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency])


    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link to={`/coins/${coin.id}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                textTransform: 'uppercase',
                color: 'white'
            }}
            >
                <img 
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
                />   
                {/* <br></br> */}
                <span>
                    {coin?.symbol}
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <span style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red"
                    }}>
                        { profit && "+" } {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                {/* <br></br> */}
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: { items: 2},
        512:{ items: 4} 
    }

    if(!trending){
        return <CircularProgress style={{ backgroundColor: 'gold'}} size={200} thickness={1} />
    }

  return (
    <div style={{
        height: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "100px",
    }}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay={true}
        items={items}
        />

        {/* <p>Carousel</p> */}
    </div>
  )
}

export default Carousel
