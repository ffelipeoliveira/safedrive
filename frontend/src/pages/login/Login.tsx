import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/navbar/NavBar';

import './Login.css';

import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";


function Login() {
	const auth = getAuth();
	const navigate = useNavigate();

	const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

	const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    }

	const signInWithEmail = async () => {
        setAuthing(true);
        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    }

	return (
		<div>
            <iframe className="background" src="https://my.spline.design/untitled-e072489ddd620938751f5db77e7233f1/" width={100}></iframe>
            <Navbar/>
			<div className="form login-form">
				{/*Title and message*/}
				<div className="title">
					<h3 className='inverted-background'>ENTRAR</h3>
				</div>
                {/*Fields*/}
                <form>
                    {/*E-mail*/}
                    <div className="input">
                        <input className="input-field" 
                            type="text"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="input-label">Email</label>
                    </div>
                    <div className="input">
                        <input className="input-field"
                            type="password"
                            value={password}
                            required={true}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <label className="input-label">Senha</label>
                    </div>

                    {error && <div className='error'>{error}</div>}
                    <div className='buttons'>
                        <button 
                            onClick={signInWithEmail}
                            disabled={authing}>
                            <FaArrowRightToBracket/> <br/> Entrar
                        </button>
                        {/*Divider*/}
                        <p className="divider">OU</p>
                        {/*Google Login Button*/}
                        <button
                            onClick={signInWithGoogle}
                            disabled={authing}>
                            <FaGoogle /> <br/> Google
                        </button>
                    </div>
                    <div className='subtext'>
                        <p>Não tem conta ainda? <a href="/cadastro">cadastre-se</a></p>
                    </div>
                </form>

			</div>
		</div>
	)
}

export default Login;