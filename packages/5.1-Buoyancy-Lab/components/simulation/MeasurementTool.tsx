'use client';

import { useSimulationStore } from '@/lib/store';
import { Line, Text } from '@react-three/drei';

export function MeasurementTool() {
  const showMeasurement = useSimulationStore((state) => state.showMeasurement);
  const tankHeight = useSimulationStore((state) => state.tankHeight);
  const waterLevel = useSimulationStore((state) => state.waterLevel);
  const brickHeight = useSimulationStore((state) => state.brickHeight);
  const brickPosition = useSimulationStore((state) => state.brickPosition);
  
  if (!showMeasurement) return null;
  
  const currentWaterLevel = useSimulationStore.getState().getCurrentWaterLevel();
  const brickBottom = brickPosition.y - brickHeight / 2;
  const brickTop = brickPosition.y + brickHeight / 2;
  
  let submergedDepth = 0;
  if (brickBottom < currentWaterLevel) {
    if (brickTop <= currentWaterLevel) {
      submergedDepth = brickHeight;
    } else {
      submergedDepth = currentWaterLevel - brickBottom;
    }
  }

  const rulerColor = '#facc15'; // yellow-400
  const fontSize = 0.4;
  const offsetX = -4.5; // Left of the tank

  return (
    <group position={[0, 0, 0]}>
      {/* Tank Height Measure */}
      <Line points={[[offsetX, 0, 0], [offsetX, tankHeight, 0]]} color={rulerColor} lineWidth={2} />
      <Line points={[[offsetX - 0.2, 0, 0], [offsetX + 0.2, 0, 0]]} color={rulerColor} lineWidth={2} />
      <Line points={[[offsetX - 0.2, tankHeight, 0], [offsetX + 0.2, tankHeight, 0]]} color={rulerColor} lineWidth={2} />
      <Text position={[offsetX - 0.8, tankHeight / 2, 0]} color={rulerColor} fontSize={fontSize} rotation={[0, 0, Math.PI/2]}>
        Tank: {tankHeight.toFixed(1)}m
      </Text>

      {/* Water Level Measure */}
      <Line points={[[offsetX + 1, 0, 0], [offsetX + 1, currentWaterLevel, 0]]} color="#60a5fa" lineWidth={2} />
      <Line points={[[offsetX + 0.8, currentWaterLevel, 0], [offsetX + 1.2, currentWaterLevel, 0]]} color="#60a5fa" lineWidth={2} />
      <Text position={[offsetX + 0.4, currentWaterLevel / 2, 0]} color="#60a5fa" fontSize={fontSize} rotation={[0, 0, Math.PI/2]}>
        Water: {currentWaterLevel.toFixed(1)}m
      </Text>

      {/* Brick Submerged Depth */}
      {submergedDepth > 0 && (
        <>
          <Line points={[[2, brickBottom, 0], [2, brickBottom + submergedDepth, 0]]} color="#ef4444" lineWidth={2} />
          <Line points={[[1.8, brickBottom, 0], [2.2, brickBottom, 0]]} color="#ef4444" lineWidth={2} />
          <Line points={[[1.8, brickBottom + submergedDepth, 0], [2.2, brickBottom + submergedDepth, 0]]} color="#ef4444" lineWidth={2} />
          <Text position={[2.6, brickBottom + submergedDepth / 2, 0]} color="#ef4444" fontSize={fontSize}>
            Submerged: {submergedDepth.toFixed(2)}m
          </Text>
        </>
      )}
    </group>
  );
}
