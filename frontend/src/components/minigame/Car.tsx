import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./wheelDebug";
import { useControls } from "./useControls";
import { useTexture } from "@react-three/drei";
import { MeshBasicMaterial } from "three";

function Car() {
	const mesh = useLoader(
		GLTFLoader,
		"/assets/car.glb"
	).scene;

	const colorMap = useTexture("/assets/car_texture.png")
	colorMap.flipY = false;

	useEffect(() => {
		colorMap.anisotropy = 16;
	}, [colorMap]);

	const position: [number, number, number] = [-1.5, 0.5, 3];
	const width = 0.15;
	const height = 0.07;
	const front = 0.15;
	const wheelRadius = 0.05;

	const chassisBodyArgs: [number, number, number] = [width, height, front * 2];
	const [chassisBody, chassisApi] = useBox(
		() => ({
			args: chassisBodyArgs,
			mass: 150,
			position,
		}),
		useRef(null)
	);

	const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

	const [vehicle, vehicleApi] = useRaycastVehicle(
		() => ({
		  chassisBody,
		  wheelInfos,
		  wheels,
		}),
		useRef(null),
	);

	useControls(vehicleApi, chassisApi);

	useEffect(() => {
		mesh.scale.set(0.13, 0.13, 0.13);
		mesh.children[0].position.set(-10, 0.8, -8);
		mesh.traverse((child) => {
			if (child.isMesh) {
				child.material = new MeshBasicMaterial({
					color: child.material.color,
					map: child.material.map 
				});
			}
		});		
	}, [mesh]);

	return (
		<group ref={vehicle} name="vehicle">
			<mesh ref={chassisBody}>
				<meshBasicMaterial transparent={true} opacity={0}/>
				<primitive object={mesh} rotation-y={Math.PI} position={[-0.5, -0.12, -1.3]}/>
				<boxGeometry args={chassisBodyArgs}/>
			</mesh>

			
			<WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
			<WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
			<WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
			<WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
		</group>
	)
}

export default Car;