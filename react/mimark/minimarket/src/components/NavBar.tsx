
import { Link } from 'react-router-dom';
import {Navbar,Container} from 'react-bootstrap'

import './styles/NavBar.css'


export const NavBar = () => {
    return (
        
        <>
        <Navbar bg="dark" variant="dark" className=''>
            <Container>
                <div className="row col">
                <Navbar.Brand href="/" className=' col'>MINIMERCADO</Navbar.Brand>
                <div className=' nav '>
                    <div className='col'>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className='col'>
                        <Link to="/" >Login</Link>
                    </div>
                    
                    
                </div>
                   
               
                </div>
            </Container>
        </Navbar>
        </>
    )
}
