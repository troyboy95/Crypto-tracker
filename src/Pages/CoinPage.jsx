import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { SingleCoin } from '../config/Api'
import CoinInfo from '../Components/CoinInfo'
import parse from 'html-react-parser'
import LinearProgress from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {

  
  const { id } = useParams()
  const [coin, setCoin] = useState()
  console.log(id)
  const { currency, symbol, user, watchlist, setAlert} = CryptoState()

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }
  
  console.log(coin)

  useEffect(() => {
    fetchCoin()
  }, [])

  const inList = watchlist.includes(coin?.id)

  const addToList = async () => {
    const coinRef = doc(db,"watchlist", user.uid)
    try {
      await setDoc(coinRef,
        {coins: watchlist ? [...watchlist, coin?.id]:[]})
        setAlert({
          open: true,
          message:`Successfully added ${coin.name} to your watchlist!`,
          type: 'success' 
        })
    } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error'
        })
    }
  }

  const removeFromList = async () => {
    const coinRef = doc(db,"watchlist", user.uid)
    try {
      await setDoc(coinRef,
        {coins: watchlist.filter((watch) => watch !== coin?.id)},
        { merge: 'true' }
        )
        setAlert({
          open: true,
          message:`Successfully removed ${coin.name} from your watchlist!`,
          type: 'success' 
        })
    } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error'
        })
    }
  }

  if(!coin) {
    return ( <div>
      <LinearProgress style={{ backgroundColor: 'gold' }} />
      <h2 style={{ color: 'white', textAlign: 'center', padding: 10 }}>Loading Please wait...</h2>
    </div>
    ) 
    }

  return (
    <div id="coin-page-main"
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <div id="coin-sidebar"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 0,
        borderRight: '2px solid grey',
        marginLeft: 5
      }}>
        <img 
        src={coin?.image.large}
        alt={coin?.name}
        height="150"
        style={{ marginBottom: 20 }}
        />
        <h3 style={{ fontWeight: 'bold', marginBottom: 20, fontFamily:'Montserrat'  }}>{coin?.name}</h3>
        <span style={{ textAlign: 'center', alignSelf: 'start', width: "100%" }}>
        {/* Coin description */}
        { coin?.description.en.split(". ")[0]} 
        </span>
        <div id='market-data'
        style={{ alignSelf: 'start', padding: 25, paddingTop: 10, width: "100%", textAlign: 'center' }}
        >
          
          <span style={{ display: 'flex', flexDirection:'column'}}>
            <h4>Rank:</h4>
            {coin?.market_cap_rank}
          </span>
          &nbsp; 
          <span style={{ display: 'flex', flexDirection:'column'}}>
            <h4>Current Price:</h4>
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
            )}
          </span>
          &nbsp;
          <span style={{ display: 'flex', flexDirection:'column'}}>
            <h4>Market Cap:</h4>
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
              .toString()
              .slice(0,-6)
            )}{" "}M
          </span>
          {user && 
          <Button
          variant='outlined'
          style={{
            width:"100%",
            height: 40,
            backgroundColor: inList ? "#ff0000" : "#EEBC1D",
            color: "black",
            marginTop: 8
          }}
          onClick={inList ? removeFromList : addToList}
          >
            {inList ? "Remove from watchlist" : "Add to watchlist"}
          </Button>
          }
        </div>
      </div>
      {/* Chart section */}
      <CoinInfo coin={coin} style={{ alignItems: 'right', justifyContent: 'center', }} />
    </div>
  )
}

export default CoinPage