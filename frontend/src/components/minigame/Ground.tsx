import { usePlane } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";

function Ground() {
	const groundMap = useTexture('/assets/ground_texture.png')
	usePlane(
		() => ({
			type: "Static",
			rotation: [-Math.PI / 2, 0, 0]
		}), useRef(null)
	);

	useEffect(() => {
		groundMap.anisotropy = 16;
	}, [groundMap]);

	const meshRef = useRef(null);

	return (
		<mesh>
			<mesh
				ref={meshRef}
				position={[-2.285, -0.03, -1.325]}
				rotation-x={-Math.PI * 0.5}
			>
			<circleGeometry args={[15, 50]} />
			<meshBasicMaterial
				opacity={1}
				alphaMap={groundMap}
				color={[0.107,0.50,0.15]}
				transparent = {true}
			/>
			</mesh>
		</mesh>
	)
}

export default Ground;