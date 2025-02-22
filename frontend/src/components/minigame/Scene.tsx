import {
	OrbitControls,
	PerspectiveCamera
} from "@react-three/drei";
import { Suspense } from "react";
import Track from "./Track";
import Ground from "./Ground";
import Car from "./Car";

function Scene() {
	return (
		<Suspense fallback={null}>
			<PerspectiveCamera makeDefault position={[-2.64, 3, 10]} fov={40}/>
			<OrbitControls target={[-2.64, 1, 0]} />
			<Track/>
			<Ground/>
			<Car/>
		</Suspense>
	)
}

export default Scene;