import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import Avatar from '@mui/material/Avatar'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { numberWithCommas } from '../../Pages/CoinPage';
import { AiFillDelete } from 'react-icons/ai'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const UserSideBar = () => {
    const [state, setState] = useState({
        right: false,
      });
      
      const { user, setAlert, watchlist, coins, symbol } = CryptoState()

      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

      const logout = () => {
        signOut(auth)
        setAlert({
            open: true,
            message: "You are successfully Logout",
            type: 'success'
        })
        toggleDrawer()
    } 
    
    const removeFromList = async (coin) => {
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

  return (
    <div>
    {['right'].map((anchor) => (
      <React.Fragment key={anchor}>
        <Avatar
        onClick={toggleDrawer(anchor, true)}
        style={{
            position: 'absolute',
            right: '40px',
            height: 38,
            width: 38,
            backgroundColor: "#EEBC1D",
            bottom: 18
        }}
        src={user.photoURL}
        alt={user.displayName || user.email}
        />
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
            <div id="drawer--main" style={{
                width: 350,
                padding: 25,
                height: "100%",
                display: 'flex',
                flexDirection:'column',
                fontFamily: 'monospace',
                backgroundColor: '#474646'
            }}>
                <div id='drawer--pic'
                 style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: "20px",
                    height: "92%"
                }}
                >
                    <Avatar 
                    style={{
                       width: 100,
                       height: 100,
                       cursor: 'pointer',
                       backgroundColor: "#EEBC1D",
                       objectFit: 'contain'
                    }}
                     src={user.photoURL}
                     alt={user.displayName || user.email}
                    />
                    <span style={{
                        width: "100%",
                        fontSize: 25,
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        wordWrap: 'break-word'
                    }}>
                        {user.displayName || user.email}
                    </span>
                    <div style={{
                        flex: 1,
                        width: "100%",
                        backgroundColor: 'gray',
                        borderRadius: 10,
                        padding: 15,
                        paddingTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 12,
                        overflowY: 'scroll'
                    }}>
                        <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                            Watchlist
                        </span>
                      {coins.map((coin) => {
                        if(watchlist.includes(coin.id)){
                          return (
                            <div id='watchlist--display' style={{
                              padding: 10,
                              borderRadius: 5,
                              width: "100%",
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              backgroundColor: "#EEBC1D",
                              boxShadow: "0 0 3px black"
                            }}>
                              <span style={{ color: 'black' }}>{coin.name}</span>
                              <span style={{ display:'flex', gap: 8, color: 'black' }}>
                                {symbol}
                                {numberWithCommas(coin.current_price.toFixed(2))}
                                <AiFillDelete 
                                style={{ color: 'red' }}
                                fontSize='16'
                                onClick={()=> removeFromList(coin)}
                                />
                              </span>
                            </div>
                          )
                        }
                      })}

                    </div>
                </div>
                <Button variant='contained'
                onClick={logout}
                style={{
                    height: '8%',
                    width: '100%',
                    backgroundColor: "#EEBC1D",
                    marginTop: 20,
                    color: 'black'
                }}
                >
                    LogOut
                </Button>
            </div>
        </Drawer>
      </React.Fragment>
    ))}
  </div>
  )
}

export default UserSideBar