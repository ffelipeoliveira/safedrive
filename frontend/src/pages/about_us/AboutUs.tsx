import Minigame from "../../components/minigame/Minigame";
import Navbar from "../../components/navbar/NavBar";

function AboutUs() {
	return (
		<div>
			<Navbar/>
			<Minigame/>
			<div className="panel">
				<h3>Equipe Blocknautica</h3>
				<ul>
					<li>Antônio Augusto</li>
					<li>Francisco Felipe</li>
					<li>Gabriel Arcanjo</li>
					<li>Gabriel Henrique</li>
					<li>José Invanildo</li>
				</ul>
			</div>
		</div>
	)
}

export default AboutUs;