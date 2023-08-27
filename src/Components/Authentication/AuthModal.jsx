import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SignUp from './SignUp';
import Login from './Login';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: '50px',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "#f0efeb",
    border: '2px solid #fff',
    borderRadius: 2,
    boxShadow: 24,
    color: 'white'
  };

const AuthModal = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { setAlert, auth } = CryptoState()

  const googleAuth = new GoogleAuthProvider()

  const signInWithGoogle = () => {
   signInWithPopup(auth, googleAuth).then((res) => {
      setAlert({
        open: true,
        message: `Sign Up successful! Welcome ${res.user.email}`,
        type: 'success'
      })
      handleClose()
    }).catch(error => {
      setAlert({
        open: true,
        message: error.message || "Something went wrong!",
        type: 'error'
      }) 
    })
  }

  return (
    <div>
        <Button onClick={handleOpen} variant='contained' style={{
            position: 'absolute',
            color: 'black',
            right: "30px",
            top: 18,
            fontFamily: 'Montserrat',
            width: 85,
            height: 40,
            backgroundColor: "#EEBC1D"
        }}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div style={{
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: 20
        }}>
          <AppBar position='static' style={{
            backgroundColor: 'transparent', color: 'white'
          }}>
            <Tabs value={value}
            onChange={handleChange}
            variant='fullWidth'
            style={{ borderRadius: 10 }}
            >
                <Tab label="Login" />
                <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          {value===0 && <Login handleClose={handleClose} />}
          {value===1 && <SignUp handleClose={handleClose} />}
          <div id='google--button' style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: 20,
            fontSize: 20,
          }}>
          <Box>
            <span style={{
              color: 'black'
            }}>OR</span>
            <GoogleButton 
            style={{ width: "100%", outline: 'none', }}
            onClick={signInWithGoogle}
            />
          </Box>
          </div>
        </div>
        </Box>
      </Modal>
      
    </div>
  )
}

export default AuthModal

// style={{
//     position: "absolute",
//     right: "50px",
//     top: 25,
//     fontSize: 20,
//     fontFamily: 'Montserrat'
// }}