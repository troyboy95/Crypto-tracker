import React, {useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = ({handleClose}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setAlert } = CryptoState()

    const handleSubmit = async () => {
      if(!email || !password){
        setAlert({
          open: true,
          message:"Please fill all fields",
          type: 'error'
        })
        // return;
      }
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        setAlert({
          open: true,
          message: `Hey ${result.user.email}, Welcome back!`,
          type: 'success'
      })
      handleClose()
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error'
      })

      }
    }


  return (
    <Box p={3}
    style={{ display: 'flex', flexDirection: 'column', gap:"20px"}}
    >
        <TextField label="Email" variant="outlined" 
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        color='secondary'
        />
        <TextField label="Password" variant="outlined" 
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        color='secondary'
        />
        <Button 
        variant='contained'
        size='large'
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
        >
            Login
        </Button>
    </Box>
  )
}

export default Login