import React, {useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const SignUp = (handleClose) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")
    const { setAlert } = CryptoState()

    const handleSubmit = async () => {
        if(password !== cnfPassword) {
            setAlert({
                open: true,
                message: "Passwords do not match!",
                type:'error'
            })
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)            
            setAlert({
                open: true,
                message: `Hey ${result.user.email}, Welcome to Crypto Tracker!`,
                type: 'success'
            })
            handleClose.handleClose()
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error'
            })
            return;
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
        <TextField label="Confirm Password" variant="outlined" 
        type='password'
        value={cnfPassword}
        onChange={(e) => setCnfPassword(e.target.value)}
        fullWidth
        color='secondary'
        />
        <Button 
        variant='contained'
        size='large'
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
        >
            Sign UP
        </Button>
    </Box>
  )
}

export default SignUp