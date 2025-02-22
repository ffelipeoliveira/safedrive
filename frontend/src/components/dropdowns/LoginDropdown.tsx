
import { FaUserPlus } from "react-icons/fa6";
import { FaArrowRightToBracket } from "react-icons/fa6";

function LoginDropdownMenu() {
  return (
    <div className="dropdown">
      <ul>
          <li>
			<a href="/entrar" className="login">
				<FaArrowRightToBracket className='subIcon' size={18}/>
				ENTRAR
			</a>
          </li>
          <li>
			<a href="/cadastro" className="signup">
				<FaUserPlus className='subIcon' size={18}/>
				CRIAR
			</a>
          </li>
      </ul>
    </div>
  );
};

export default LoginDropdownMenu;