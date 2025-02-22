import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useTexture } from "@react-three/drei";
import { ColliderBox } from "./ColliderBox";

function Track() {
	const result = useLoader(
		GLTFLoader,
		"/assets/track.glb"
	);

	const colorMap = useTexture('/assets/track_texture.png')
	colorMap.flipY = false;

	useEffect(() => {
		colorMap.anisotropy = 16;
	}, [colorMap]);

	const geometry = result.scene.children[0].geometry;

	return (
		<>
			<mesh geometry={geometry}>
				<meshBasicMaterial
					map={colorMap}
				/>
			</mesh>

			<ColliderBox position={[0.5, 0, -1.47]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[0.2, 0, 0.6]} scale={[0.1, 1, 0.1]}/>
			<ColliderBox position={[0.7, 0, 0.6]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[1.2, 0, 1.1]} scale={[0.4, 1, 0.4]}/>
			<ColliderBox position={[0.6, 0, 1.1]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[1.2, 0, 1.75]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[1.7, 0, 1.7]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[1.7, 0, 2.2]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[0, 0, 2.5]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[-0.5, 0, 1.1]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[-1.3, 0, 0.2]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[-2.2, 0, -0.5]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[0.1, 0, -0.2]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[-1.2, 0, -1.15]} scale={[0.1, 1, 0.1]}/>
			<ColliderBox position={[-1.5, 0, -1.65]} scale={[0.1, 1, 0.1]}/>
			<ColliderBox position={[-2.8, 0, -1.7]} scale={[0.1, 1, 0.1]}/>
			<ColliderBox position={[-2.5, 0, -2.4]} scale={[0.1, 1, 0.1]}/>
			<ColliderBox position={[-2.5, 0, -2.9]} scale={[0.1, 1, 0.1]}/>
			<ColliderBox position={[-1.85, 0, -2.9]} scale={[0.7, 1, 0.1]}/>
			<ColliderBox position={[-1.3, 0, -2.75]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[-0.5, 0, -2.45]} scale={[0.2, 1, 0.2]}/>
			<ColliderBox position={[-0.8, 0, -2.95]} scale={[0.2, 1, 0.2]}/>
		</>
	)
}

export default Track;