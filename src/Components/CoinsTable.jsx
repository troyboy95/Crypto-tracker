import React, {useState, useEffect} from 'react'
import { CoinList } from '../config/Api'
import { CryptoState } from '../CryptoContext'
import { Container, Form,InputGroup, Table } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {

    const [search, setsearch] = useState("")
    const [page, setPage] = useState(1)

    const { currency, symbol, coins, loading, fetchCoins, setCoins} = CryptoState()

    useEffect(() => {
      fetchCoins()
    }, [currency])
    
    // console.log(coins)

    const handleSearch = () => {
      return coins.filter((coin) => {
        return coin.name.toLowerCase().includes(search) || 
        coin.symbol.toLowerCase().includes(search);
      })
    }

  return (

     <Container>
        <h4 style={{ fontSize: 40, fontWeight: 300, textAlign: 'center' }} className='my-3'>Crypto Currency Prices by Market Cap</h4>
        <Form>
          <InputGroup>
          <input
          type='search'
          placeholder='Search for a Crypto Currency'
          aria-label='Search'
          style={{
            width: '100%',
            height: 55,
            backgroundColor: 'black',
            // outline: 'none',
            border: 'none',
            borderRadius: 5,
            color: 'white',
            marginBottom: 10,
            padding: "8px 15px",
          }}
          onChange={(e) => setsearch(e.target.value)}
          />
          </InputGroup>
        </Form>
        <div style={{ display:'flex', justifyContent: 'center',}}>
        <Table className='table' style={{ margin:0, borderCollapse: 'collapse', width: "100%", height: 50}}>
          <thead style={{
              backgroundColor: "#EEBC1D",
            }}>
            <tr>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                <th style={{
                  color: 'black',
                  fontWeight: "700",
                  fontFamily: 'Montserrat',
                  backgroundColor: 'gold'
                }}
                key={head}
                align={head === "Coin" ? "" : "right"}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
                {handleSearch()
                .slice((page-1)*10, (page-1)*10 + 10)
                .map(row => {
                  const profit = row.price_change_percentage_24h > 0;
                  return(
                    <tr
                    key={row.name}
                    style={{
                    backgroundColor: "#16171a",
                    cursor: 'pointer',
                    "&:hover":{
                      backgroundColor: "#131111"
                    },
                    fontFamily: 'Montserrat'
                    }}
                    >
                      <th scope='row' style={{ display: 'flex', gap: 15, backgroundColor: 'black'}}>
                        <Link to={`/coins/${row.id}`}>
                        <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10, }}
                        />
                        </Link>
                        </th>
                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                          <span style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                            backgroundColor: 'black'
                          }}>
                            {row.symbol}
                          </span>
                          <span style={{ color: 'darkgray', backgroundColor: 'black' }}>{row.name}</span>
                        </div>
                        <th align='right' style={{ padding: 10, color: 'white', backgroundColor: 'black' }}>
                          {symbol}{" "}
                          {numberWithCommas(row?.current_price.toFixed(2))}
                        </th>
                      
                      <th align='right' style={{
                        color: profit ? "rgb(14, 203, 129)" : 'red',
                        fontWeight: 500, backgroundColor: 'black'
                      }}>
                        { profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </th>
                      <th style={{ backgroundColor: 'black', color: 'white'}}>
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}M
                      </th>
                    </tr>
                  )
                })}
          </tbody>
        </Table>
        </div>
        <Pagination count={(handleSearch()?.length/10).toFixed(0)} color='secondary'
        style={{
          padding: 10,
          width: "100%",
          display:'flex',
          justifyContent:"center",
          backgroundColor: '#EEBC1D',
          color: 'gold'
        }}
        onChange={(_,value) => {
          setPage(value)
          window.scroll(0,450)
        }}
        >
          {/* <Pagination.Item count={(handleSearch()?.length/10).toFixed(0)}
          style={{ color: 'gold' }}
          ></Pagination.Item> */}
        </Pagination>
        

     </Container>
  )
}

export default CoinsTable