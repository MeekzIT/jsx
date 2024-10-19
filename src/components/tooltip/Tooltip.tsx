import React from "react";

interface ITooltip {
  data: string;
}

const TooltipPrice = ({ data }: ITooltip) => {
  return <span className="tooltip">{data}</span>;
};

export default TooltipPrice;
