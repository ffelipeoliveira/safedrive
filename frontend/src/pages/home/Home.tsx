import NavBar from "../../components/navbar/NavBar"
import Minigame from "../../components/minigame/Minigame";
import './Home.css';

import logo from '/assets/logo.png';

function Home() {
	return (
		<div className="home">
			<NavBar/>
			<div className="banner">
				<Minigame/>
				<div className="home-title">
					<img src={logo} alt="SAFEDRIVE"/>
					<h1> A promessa de um amanhã seguro, </h1>
					<br></br>
					<h1> começando hoje.</h1>
				</div>

				<a href="/contratos" className="signin-button inverted-background-button">CONTRATAR</a>
			</div>
		</div>
	)
}

export default Home