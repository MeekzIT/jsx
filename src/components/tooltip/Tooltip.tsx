import { useAppSelector } from "../../hooks/hooks";

interface ITooltip {
  data: string;
}

const TooltipPrice = ({ data }: ITooltip) => {
  const currentCurrency = localStorage.getItem("currency");

  const currency = useAppSelector((state) => state.constr.currency);

  if (!currency) return;

  const getPrice = (price: string) => {
    if (currentCurrency === "am") {
      return new Intl.NumberFormat("de-DE", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "AMD",
      }).format(Math.round(Number(price) * currency?.AMD));
    } else if (currentCurrency === "ru") {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(Math.round(Number(price) * currency?.RUB));
    } else
      return new Intl.NumberFormat("de-DE", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "USD",
      }).format(Math.round(Number(price)));
  };
  return <span className="tooltip">{getPrice(data)}</span>;
};

export default TooltipPrice;
