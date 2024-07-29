"use client";

import ReactSpeedometer from "react-d3-speedometer";
import useLocationStore from "../../stores/LocationStore";

function Speedometer() {
  const { speed } = useLocationStore();

  return (
    <ReactSpeedometer
      maxValue={2.50}
      value={speed}
      needleColor="red"
      height={200}
      startColor="green"
      segments={10}
      endColor="red"
      currentValueText={`Ground Speed: #{value} m/s`}
      currentValuePlaceholderStyle={`#{value}`}
    />
  );
}

export default Speedometer;
