import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import DropdownMenu from '../dropdowns/UserDropdown';
import LoginDropdownMenu from '../dropdowns/LoginDropdown';

import { FaUser } from 'react-icons/fa';
import { FaArrowRightToBracket } from "react-icons/fa6";

import './NavBar.css';
import logo from '/assets/logo.png';

function Navbar() {
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const handleMouseEnter = () => {
      setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
      setDropdownVisible(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [auth]);

    return (
        <div>
            {user ? (
                <nav className="navbar w-full">
                    <a href="/" className="home logo"><img src={logo} alt="SAFEDRIVE" width={130}/></a>
                    <nav className="subnavbar">
                        <a href="/sobre_nos" className="item">SOBRE NÓS</a>
                        <div className="menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button><FaUser className="icon" size={18}/></button>
                            {isDropdownVisible && <DropdownMenu />}
                        </div>
                    </nav>
                </nav>
            ) : (
                <nav className="navbar w-full">
                    <a href="/" className="logo"><img src={logo} alt="SAFEDRIVE" width={130}/></a>
                    <nav className="subnavbar">
                        <a href="/sobre_nos" className="item">SOBRE NÓS</a>
                        <div className="menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button><FaArrowRightToBracket className='subIcon' size={18}/></button>
                            {isDropdownVisible && <LoginDropdownMenu />}
                        </div>
                    </nav>
                </nav>
            )}
        </div>
    );
}

export default Navbar;
