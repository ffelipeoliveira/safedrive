import { useCompoundBody} from "@react-three/cannon";
import { MutableRefObject, useRef } from "react";
import { Object3D } from "three";

export interface WheelInfo {
  radius: number;
  directionLocal: [number, number, number];
  axleLocal: [number, number, number];
  suspensionStiffness: number;
  suspensionRestLength: number;
  frictionSlip: number;
  dampingRelaxation: number;
  dampingCompression: number;
  maxSuspensionForce: number;
  rollInfluence: number;
  maxSuspensionTravel: number;
  customSlidingRotationalSpeed: number;
  useCustomSlidingRotationalSpeed: boolean;
  chassisConnectionPointLocal: [number, number, number];
  isFrontWheel: boolean;
}

export const useWheels = (
  width: number,
  height: number,
  front: number,
  radius: number
): [MutableRefObject<Object3D | null>[], WheelInfo[]] => {
  const wheels = [
    useRef<Object3D | null>(null),
    useRef<Object3D | null>(null),
    useRef<Object3D | null>(null),
    useRef<Object3D | null>(null),
  ];

  const wheelInfo: Omit<WheelInfo, "chassisConnectionPointLocal" | "isFrontWheel"> = {
    radius,
    directionLocal: [0, -1, 0],
    axleLocal: [1, 0, 0],
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos: WheelInfo[] = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
  ];

  wheels.forEach((wheel, index) => {
    useCompoundBody(
      () => ({
        collisionFilterGroup: 0,
        mass: 1,
        position: wheelInfos[index].chassisConnectionPointLocal,
        shapes: [
          {
            type: "Cylinder",
            args: [radius, radius, 0.015, 16] as [number, number, number, number],
            rotation: [0, 0, -Math.PI / 2] as [number, number, number],
          },
        ],
        type: "Kinematic" as const,
      }),
      wheel
    );
  });

  return [wheels, wheelInfos];
};
