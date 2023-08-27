import Navbar from 'react-bootstrap/Navbar';
import { Form } from 'react-bootstrap';
import { CryptoState } from '../CryptoContext';
import { Link } from 'react-router-dom'
import AuthModal from './Authentication/AuthModal';
import UserSideBar from './Authentication/UserSideBar';


function Header() {

  const {currency, setCurrency, user } = CryptoState()
  // console.log(currency)
  return (
      <Navbar expand="lg" className="nav--text" variant='dark'>
          <Navbar.Brand style={{
            fontSize: 'x-large',
            color: 'gold'
          }}>
            <Link to={`/`}>
                Crypto Hunter
            </Link>
          </Navbar.Brand>
          <Form.Select className='nav--currency' style={{
            color: 'white'
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          >
            <option value={"INR"}>INR</option>
            <option value={"USD"}>USD</option>
          </Form.Select>
          <div>
          {user ? <UserSideBar /> : <AuthModal/>}
          </div>
      </Navbar>
  );
}

export default Header;