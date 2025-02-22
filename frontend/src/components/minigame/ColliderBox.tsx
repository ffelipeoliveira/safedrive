import { useBox } from "@react-three/cannon";

interface ColliderBoxProps {
  position: [number, number, number];
  scale: [number, number, number];
}

const debug = false;

export function ColliderBox({ position, scale }: ColliderBoxProps) {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return (
    <>
      {debug && (
        <mesh position={position}>
			<meshBasicMaterial transparent={true} opacity={0.3}/>
          <boxGeometry args={scale} />
        </mesh>
      )}
    </>
  );
}
