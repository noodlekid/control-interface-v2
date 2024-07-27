"use client";

import ReactSpeedometer from "react-d3-speedometer";
import useLocationStore from "../../stores/LocationStore";

function HorizontalAccuracy() {
  const { horizontalAccEst} = useLocationStore();

  return (
    <ReactSpeedometer

      maxValue={1000}
      value={horizontalAccEst}
      needleColor="red"
      startColor="green"
      height={200}
      segments={1000}
      maxSegmentLabels={10}
      endColor="red"
      currentValueText={`GPS Accuracy: #{value} mm`}
      currentValuePlaceholderStyle={`#{value}`}
    />
  );
}

export default HorizontalAccuracy;
