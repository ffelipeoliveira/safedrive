import { useEffect, useState } from "react";

interface VehicleApi {
  applyEngineForce: (force: number, wheelIndex: number) => void;
  setSteeringValue: (value: number, wheelIndex: number) => void;
}

interface ChassisApi {
  applyLocalImpulse: (impulse: [number, number, number], worldPoint: [number, number, number]) => void;
  position: {
    set: (x: number, y: number, z: number) => void;
  };
  velocity: {
    set: (x: number, y: number, z: number) => void;
  };
  angularVelocity: {
    set: (x: number, y: number, z: number) => void;
  };
  rotation: {
    set: (x: number, y: number, z: number) => void;
  };
}

// Define the possible control keys
type ControlKey = "w" | "a" | "s" | "d" | "r";
type ControlsState = Record<ControlKey, boolean>;

// Constants for better readability
const ENGINE_FORCE = 150;
const STEERING_VALUE = 0.4;
const RESET_POSITION = [-1.5, 0.5, 3] as const;
const RESET_VELOCITY = [0, 0, 0] as const;
const RESET_ROTATION = [0, 0, 0] as const;

export const useControls = (vehicleApi: VehicleApi | null, chassisApi: ChassisApi | null): ControlsState => {
  const [controls, setControls] = useState<ControlsState>({
    w: false,
    a: false,
    s: false,
    d: false,
    r: false,
  });

  // Handle keydown and keyup events
  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent, isKeyDown: boolean) => {
      const key = e.key.toLowerCase() as ControlKey;
      if (controls.hasOwnProperty(key)) {
        setControls((prevControls) => ({ ...prevControls, [key]: isKeyDown }));
      }
    };

    const keyDownHandler = (e: KeyboardEvent) => handleKeyEvent(e, true);
    const keyUpHandler = (e: KeyboardEvent) => handleKeyEvent(e, false);

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [controls]);

  // Apply vehicle controls
  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;

    // Handle engine force
    if (controls.w) {
      vehicleApi.applyEngineForce(ENGINE_FORCE, 2);
      vehicleApi.applyEngineForce(ENGINE_FORCE, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-ENGINE_FORCE, 2);
      vehicleApi.applyEngineForce(-ENGINE_FORCE, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    // Handle steering
    const steeringValue = controls.a ? STEERING_VALUE : controls.d ? -STEERING_VALUE : 0;
    const frontSteeringValue = controls.a ? -0.1 : controls.d ? 0.1 : 0;

    vehicleApi.setSteeringValue(steeringValue, 2);
    vehicleApi.setSteeringValue(steeringValue, 3);
    vehicleApi.setSteeringValue(frontSteeringValue, 0);
    vehicleApi.setSteeringValue(frontSteeringValue, 1);

    // Reset vehicle position
    if (controls.r) {
      chassisApi.position.set(...RESET_POSITION);
      chassisApi.velocity.set(...RESET_VELOCITY);
      chassisApi.angularVelocity.set(...RESET_VELOCITY);
      chassisApi.rotation.set(...RESET_ROTATION);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};