import React, { useState, useEffect } from 'react'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { HistoricalChart } from '../config/Api'
import {CircularProgress} from '@mui/material'
import { Line } from 'react-chartjs-2'
import { chartDays } from '../config/data'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import SelectButton from './SelectButton'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({coin}) => {

  const [historicalData, setHistoricalData] = useState([])
  const [days, setDays] = useState(1)
  const [flag,setflag] = useState(false);
  const { currency } = CryptoState()

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setflag(true)
    setHistoricalData(data.prices)
  }

  useEffect(() => {
    fetchHistoricalData()
  }, [days])

  return (
      <div className='responsive-div' style={{
      
         display: 'flex', flexDirection: 'column', alignItems: 'center',
        marginTop: 25, padding: 40, position: 'relative', right: '0px'
      }}>
        { !historicalData ? (
          <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
        ) : (
          <>
            <Line
            data={{
              labels: historicalData?.map((coin) => {
                let date = new Date(coin[0])
                let time = date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                : `${date.getHours()}:${date.getMinutes()}AM`
                return days === 1 ?  time :  date.toLocaleDateString()
              }),
              datasets:[
                {data: historicalData.map((coin) => coin[1]),
                label: `Price (Past ${days} Days) in ${currency}`,
                borderColor: "#EEBC1D",
                }
              ]
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
            />
            <div 
            style={{
              display: 'flex',
              marginTop: 20,
              justifyContent: 'space-around',
              width: "100%",
            }}
            >
              {chartDays.map(day => (
                <SelectButton 
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        ) }
      </div>

  )
}

export default CoinInfo