import React from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from "react-sparklines";

export default ({ height, width, data, color, unit }) => {
  const mean = (
    data.reduce((prev, curr) => {
      return prev + curr;
    }, 0) / data.length
  ).toFixed(1);
  return (
    <div>
      <Sparklines height={height} width={width} data={data}>
        <SparklinesLine color={color} />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <div>{mean} {unit}</div>
    </div>
  );
};
