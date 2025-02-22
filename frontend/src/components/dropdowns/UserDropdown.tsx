import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { FaCarSide } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

function UserDropdownMenu() {
  const auth = getAuth();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
        await signOut(auth);
        navigate('/inicio');
    } catch (error) {
        console.error('Erro ao sair:', error);
    }
  };

  return (
    <div className="dropdown">
      <ul>
          <li>
              <a href="/meus_carros">
                  <FaCarSide className='subIcon' size={18}/>CARROS
              </a>
          </li>
          <li onClick={logOut}>
            <FaArrowRightFromBracket className='subIcon'/>
            SAIR
          </li>
      </ul>
    </div>
  );
};

export default UserDropdownMenu;