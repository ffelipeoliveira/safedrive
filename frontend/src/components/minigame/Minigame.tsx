import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import Scene from "./Scene";

import "./Minigame.css";

function Minigame() {
	return (
		<React.StrictMode>
			<Canvas>
		  		<Physics
					broadphase="SAP"
					gravity={[0, -5, 0]}
				>
				  <Scene />
				</Physics>
			</Canvas>
			<div className="awsd">
				
			</div>
	  	</React.StrictMode>
	)
}

export default Minigame;

