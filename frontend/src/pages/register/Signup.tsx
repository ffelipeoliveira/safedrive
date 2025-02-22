import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/navbar/NavBar';

import { FaUserPlus } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";

function Signup() {
    const auth = getAuth();
    const navigate = useNavigate();

	const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

	const signUpWithGoogle = async () => {
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
    };

	const signUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthing(true);
        setError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    };

	return (
		<div>
			<iframe className="background" src="https://my.spline.design/untitled-e072489ddd620938751f5db77e7233f1/" width={100}></iframe>
			<Navbar/>
			<div className="form signup-form">
				{/*Title and message*/}
				<div className="title">
					<h3 className='inverted-background'>CADASTRO</h3>
				</div>
				{/*Fields*/}
				<form>
					{/*E-mail*/}
					<div className="input">
						<input type="text"
							className="input-field"
							value={email}
							required={true}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label className="input-label">Email</label>
					</div>
					<div className='input'>
						<input type="password"
							className="input-field"
							value={password}
							required={true}
							onChange={(e) => setPassword(e.target.value)} 
						/>
						<label className="input-label">Senha</label>
					</div>
					<div className='input'>
						<input type="password"
							className='input-field'
							value={confirmPassword}
							required={true}
							onChange={(e) => setConfirmPassword(e.target.value)} 
						/>
						<label className="input-label">Confirmar Senha</label>
					</div>

					{error && <div className='text-red-500 mb-4'>{error}</div>}
					<div className='buttons'>
						<button className="w-full mb-4 text-white bg-transparent border-white text-center flex items-center justify-center cursor-pointer p-4"
							onClick={signUpWithEmail}
							disabled={authing}
						>
							<FaUserPlus/> <br/> Cadastrar
						</button>
						{/*Divider*/}
						<p className="divider">OU</p>
						<button
							onClick={signUpWithGoogle}
							disabled={authing}
						>
						<FaGoogle/> Google
						</button>
					</div>
					<div className='subtext'>
							<p>Já tem uma conta? <a href='/entrar'>Entrar</a></p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Signup